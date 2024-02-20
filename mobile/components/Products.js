import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons ,AntDesign } from "@expo/vector-icons";
import Loding from "./loding";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartAddedMap, setCartAddedMap] = useState({});
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [morning, setMorning] = useState(false);
  const [evening, setEvening] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);
  const [productScheduleMap, setProductScheduleMap] = useState({});

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://dptf.onrender.com/api/v1/item/get-item`
      );
      setLoading(false);
      setProducts(data.item);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    _retrieveData();
  }, [cartAddedMap]);

  const navigation = useNavigation();

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
    // Implement the logic for handling product schedule change
    // For example, you might want to update the state or perform other actions.
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

    // Set the corresponding schedule values based on the selected schedule
    const updatedCart = [...cart, selectedProduct];
    await AsyncStorage.setItem("@cart", JSON.stringify(updatedCart));

    console.log(`${productName} added to cart successfully!`);

    setCartAddedMap((prevMap) => ({
      ...prevMap,
      [productId]: true,
    }));

    // Update the product schedule state
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

      // Remove the product from the product schedule state
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
    <View>
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: "10%",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                margin: 10,
                fontWeight: "bold",
                paddingLeft: "20%",
              }}
            >
              Available Tiffins
            </Text>
            <Pressable
              onPress={() => setFilterModalVisible(!isFilterModalVisible)}
              style={{ textAlign: "center", fontSize: 20, paddingTop: 60 }}
            >
              <Text
                style={{
                  color: !isFilterModalVisible ? "green" : "red",
                }}
              >
                <Ionicons
                  name="filter"
                  size={24}
                  color={!isFilterModalVisible ? "green" : "red"}
                />
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products&&products.length>0 ? (products?.map(
              (
                p // quantity is not aviable in products map
              ) => (
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
                      {/* <Text style={styles.detailValue}>
                        Tiffin ID: {p.tiffinId}
                      </Text> */}
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
                        :handleAddCart(
                          p._id,
                          p.name,
                          productScheduleMap[p._id]?.morning &&  productScheduleMap[p._id]?.evening ? p.price2 : p.price1,
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
            )):(<Loding/>)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: 180,
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
    paddingBottom: 5,
    marginBottom: 5,
  },
  detailValue: {
    color: "#000000",
  },
  Price: {
    color: "green",
    fontWeight: "bold",
    textAlign: "right",
  },
  quantityButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityparent: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
   alignItems:"center",
   justifyContent:"center",
   flexDirection:"row",
   display:"flex",
   padding:10
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Products;
