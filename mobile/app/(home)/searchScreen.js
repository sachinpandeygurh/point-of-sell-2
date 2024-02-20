import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SearchScreen() {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const [cartAddedMap, setCartAddedMap] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productScheduleMap, setProductScheduleMap] = useState({});

  useEffect(() => {
    const productdata = async () => {
      try {
        const result = await Axios.get(
          `https://dptf.onrender.com/api/v1/item/get-item`
        );
        setProducts(result?.data?.item || []);
      } catch (error) {
        console.error(error);
      }
    };
    filtered()
   
    productdata();
  }, [value, products]);

  const filtered = () => {
    const filteredProducts = products.length > 0 && products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
  
    setFilteredProducts(filteredProducts);
  };
  
  console.log("filteredProducts updated:", filteredProducts);
  console.log("filteredProducts filtered:", filtered);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const cartString = await AsyncStorage.getItem("@cart");
      if (!cartString) {
        return;
      }

      let cart = JSON.parse(cartString);
      const updatedCart = cart.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));

      console.log(
        `Quantity for product with productId ${productId} updated successfully!`
      );

      // Update the quantity state
      setQuantity(newQuantity);

      _retrieveData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleProductScheduleChange = (productId, newSchedule) => {
    console.log(`Product schedule changed for ${productId}:`, newSchedule);
    setProductScheduleMap((prevMap) => ({
      ...prevMap,
      [productId]: newSchedule,
    }));
  };


  const handleAddCart = async (
    productId,
    productName,
    productPrice,
    productDescription,
    quantity,
    schedule
  ) => {
    if (cartAddedMap[productId]) {
      return;
    }

    try {
      const cartString = await AsyncStorage.getItem("@cart");
      const cart = cartString ? JSON.parse(cartString) : [];
      const selectedProduct = {
        productId,
        productName,
        productPrice,
        productDescription,
        quantity,
        schedule,
      };
      const updatedCart = [...cart, selectedProduct];
      await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));

      console.log(`${productName} added to cart successfully!`);

      setCartAddedMap((prevMap) => ({
        ...prevMap,
        [productId]: true,
      }));
      setProductScheduleMap((prevMap) => ({
        ...prevMap,
        [productId]: schedule,

      }));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };


  const handleRemove = async (productId) => {
    try {
      const cartString = await AsyncStorage.getItem("@cart");
      if (!cartString) {
        return;
      }
      let cart = JSON.parse(cartString);
      const updatedCart = cart.filter(
        (product) => product.productId !== productId
      );

      await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));

      console.log(
        `Product with productId ${productId} removed from cart successfully!`
      );

      setCartAddedMap((prevMap) => ({
        ...prevMap,
        [productId]: false,
      }));
      setProductScheduleMap((prevMap) => {
        const { [productId]: removed, ...rest } = prevMap;
        return rest;
      });

      _retrieveData();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@cart");
      if (value !== null) {
        const cartData = JSON.parse(value);
        console.log(cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#7F7FD5", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={styles.containersearch}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("../../img/c_logo.png")}
              />
            </View>
            <View style={styles.searchContainer}>
              <EvilIcons name="search" size={24} color="black" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={value}
                onChangeText={(text) => setValue(text.toLowerCase())}
              />
              <Feather name="mic" size={24} color="black" />
            </View>
          </View>
        </View>

        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  margin: 10,
                  fontWeight: "bold",
                }}
              >
                Search results
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {filteredProducts && filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <TouchableOpacity key={p._id} style={styles.productContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: `https://dptf.onrender.com/api/v1/item/get-photo/${p._id}`,
                        }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                    <ScrollView style={styles.productDetails}>
                      <Text style={styles.productName}>{p.name}</Text>
                      <Text style={styles.productDescription}>
                        {p.description}
                      </Text>

                      <View style={styles.detailRow}>
                        {!productScheduleMap[p._id]?.morning &&
                          productScheduleMap[p._id]?.evening && (
                            <Text style={styles.Price}>&#x20B9; {p.price1}</Text>
                          )}
                        {productScheduleMap[p._id]?.morning &&
                          !productScheduleMap[p._id]?.evening && (
                            <Text style={styles.Price}>&#x20B9; {p.price1}</Text>
                          )}
                        {!productScheduleMap[p._id]?.morning &&
                          !productScheduleMap[p._id]?.evening && (
                            <Text style={styles.Price}>&#x20B9; {p.price1}</Text>
                          )}
                        {productScheduleMap[p._id]?.morning &&
                          productScheduleMap[p._id]?.evening && (
                            <Text style={styles.Price}>&#x20B9; {p.price2}</Text>
                          )}
                      </View>

                      <View style={styles.detailRow}>
                        <Pressable
                          style={{
                            backgroundColor: productScheduleMap[p._id]?.morning
                              ? "red"
                              : "white",
                            padding: 10,
                            borderWidth: productScheduleMap[p._id]?.morning
                              ? 0
                              : 1,
                            borderColor: "red",
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            handleProductScheduleChange(p._id, {
                              morning: !productScheduleMap[p._id]?.morning,
                              evening: productScheduleMap[p._id]?.evening,
                            })
                          }
                        >
                          <Text
                            style={{
                              color: productScheduleMap[p._id]?.morning
                                ? "white"
                                : "red",
                              fontWeight: "bold",
                            }}
                          >
                            Morning
                          </Text>
                        </Pressable>
                        <Pressable
                          style={{
                            backgroundColor: productScheduleMap[p._id]?.evening
                              ? "green"
                              : "white",
                            padding: 10,
                            borderWidth: productScheduleMap[p._id]?.evening
                              ? 0
                              : 1,
                            borderColor: "green",
                            borderRadius: 10,
                          }}
                          onPress={() =>
                            handleProductScheduleChange(p._id, {
                              morning: productScheduleMap[p._id]?.morning,
                              evening: !productScheduleMap[p._id]?.evening,
                            })
                          }
                        >
                          <Text
                            style={{
                              color: productScheduleMap[p._id]?.evening
                                ? "white"
                                : "green",
                              fontWeight: "bold",
                            }}
                          >
                            Evening
                          </Text>
                        </Pressable>
                      </View>
                      <View style={styles.detailRow}>
                      </View>
                      <View style={styles.detailRow}>
                        <Text
                          style={{
                            color: p.category === "veg" ? "green" : "red",
                          }}
                        >
                          {p.category}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontStyle: "italic", fontWeight: "800" }}>
                          {p.thaliType}
                        </Text>
                      </View>
                    </ScrollView>
                    <Pressable
                      style={{
                        padding: 10,
                        backgroundColor: cartAddedMap[p._id] ? "" : "white",
                        borderWidth: 0.5,
                        borderColor: cartAddedMap[p._id] ? "" : "blue",
                        borderRadius: 5,
                        width: "80%",
                        marginHorizontal: "10%",
                        marginBottom: 20,
                      }}
                      onPress={() =>
                        cartAddedMap[p._id]
                          ? handleRemove(p._id)
                          : handleAddCart(
                            p._id,
                            p.name,
                            productScheduleMap[p._id]?.morning && productScheduleMap[p._id]?.evening ? p.price2 : p.price1,
                            p.description,
                            quantity,
                            productScheduleMap[p._id] || {
                              morning: false,
                              evening: false,
                            }
                          )

                      }
                      disabled={cartAddedMap[p._id]}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: cartAddedMap[p._id] ? "white" : "blue",
                          fontWeight: "bold",
                        }}
                      >
                        {cartAddedMap[p._id] ? (
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Pressable
                                style={styles.quantityButton}
                                onPress={() => {
                                  handleQuantityChange(p._id, quantity - 1);
                                  console.log(quantity - 1);
                                }}
                                disabled={quantity === 1}
                              >
                                <Text style={styles.quantityButtonText}>-</Text>
                              </Pressable>
                              <View style={styles.quantityparent}>
                                <Text style={styles.quantity}>
                                  {quantity}
                                </Text>
                              </View>
                              <Pressable
                                style={styles.quantityButton}
                                onPress={() => {
                                  handleQuantityChange(p._id, quantity + 1);
                                  console.log(quantity + 1);
                                }}
                              >
                                <Text style={styles.quantityButtonText}>+</Text>
                              </Pressable>
                            </View>
                            <Pressable
                              style={styles.removeButton}
                              onPress={() => handleRemove(p._id)}
                            >
                              <Text ><AntDesign name="delete" size={24} color="red" /></Text>
                            </Pressable>
                          </View>
                        ) : (
                          "Add to Cart"
                        )}
                      </Text>
                    </Pressable>
                  </TouchableOpacity>
                )
                )) : (
                <Text>No Product avilable for: {value}</Text>
              )}
            </View>
          </View>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    backgroundColor: "black",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    marginTop: 40,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  containersearch: {
    backgroundColor: "white",
    // flex: 1,
    // position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 99,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "white",
    padding: 10,
  },
  logoContainer: {
    backgroundColor: "black",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 30,
    marginTop: 20,
    borderRadius: 25,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  productContainer: {
    width: 180,
    // height: 350,
    margin: 8,
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 5,
    backgroundColor: "#f2f3f4",
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    height: 200,
    width: 130,
    marginHorizontal: "15%",
    marginVertical: 10,
    alignItems: "stretch",
    justifyContent: "center",

    // overflow: 'hidden',
  },
  image: {
    flex: 1,
    borderRadius: 10,
    height: 200,
    width: "auto",
    padding: 20,
    margin: "auto",
  },
  productDetails: {
    padding: 8,
  },
  productName: {
    fontWeight: "bold",
    textAlign: "center",
  },
  productDescription: {
    color: "gray",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    // borderColor: "gray",
    paddingBottom: 5,
    marginBottom: 5,
  },
  detailValue: {
    color: "#000000",
  },
  Price: {
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
  },
});
