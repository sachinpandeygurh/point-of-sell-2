import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import {
  AntDesign,
  Feather,
  EvilIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";


const Footer = () => {
  const navigation = useRouter();
  const [auth, setAuth] = useState(null);
  const [cartArray, setCartArray] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const [homeScreen, setHomeScreen] = useState(true);
  const [notificationsScreen, setNotificationsScreen] = useState(false);
  const [accountScreen, setAccountScreen] = useState(false);
  const [cartScreen, setCartScreen] = useState(false);
  const [active, setActive] = useState(false)

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        const authData = JSON.parse(value);
        setAuth(authData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const footercomponents = [
    {
      id: 1,
      options: "Home",
      active: true,
      route: "/(home)",
      icon: <AntDesign color="black" size={24} name="home" />
    },
    {
      id: 2,
      options: "notifications",
      active: false,
      route: "/notifications",
      icon: <Feather color="black" size={24} name="bell" />
    },
    {
      id: 3,
      options: "account",
      active: false,
      route: "/account",
      icon: <FontAwesome5 color="black" size={24} name="user-circle" />
    },
    {
      id: 4,
      options: "cart",
      active: false,
      route: "/cart",
      icon: <EvilIcons color="black" size={24} name="cart" />
    },
  ];

  const handlePress = (item) => {
    console.log(`Navigating to ${item?.route}`);
    console.log(`Active to ${item?.active}`);
    // item?.active === true ? item?.active === false : item?.active === true 
    console.log(`Active status before: ${item?.active}`);
    item.active = !item.active;

    console.log(`Active status after: ${item?.active} , ${item?.route}`);
    navigation.push(item?.route);
  };

  const retrieveCart = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("@cart");
      if (storedValue !== null) {
        const cartData = JSON.parse(storedValue);
        const updatedCartWithoutEmpty = cartData.filter(
          (item) => Object.keys(item).length !== 0
        );

        setCartSize(updatedCartWithoutEmpty.length);
        setCartArray(updatedCartWithoutEmpty);
      } else {
        setCartSize(0);
        setCartArray([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth === null && retrieveData();
    retrieveCart();
  }, [auth, cartSize]);

  const handleHome = () => {
    navigation.push("/(home)");
    setHomeScreen(true);
    setNotificationsScreen(false);
    setAccountScreen(false);
    setCartScreen(false);
  };

  const handleNotifications = () => {
    setHomeScreen(false);
    setNotificationsScreen(true);
    setAccountScreen(false);
    setCartScreen(false);
    navigation.push("notifications");

  };

  const handleAccount = () => {
    setHomeScreen(false);
    setNotificationsScreen(false);
    setAccountScreen(true);
    setCartScreen(false);
    navigation.push("account");
  };

  const handleCart = () => {
    navigation.push("cart");
    setHomeScreen(false);
    setNotificationsScreen(false);
    setAccountScreen(false);
    setCartScreen(true);
  };

  return (
    // <View style={styles.footerContainer}>
    //   <TouchableOpacity
    //     onPress={handleHome}
    //     style={homeScreen ? styles.bgiconContainer : styles.iconContainer}
    //   >
    //     <AntDesign
    //       name="home"
    //       size={24}
    //       color={homeScreen ? "#ffffff" : "black"}
    //     />
    //     {homeScreen && <Text style={styles.iconText}>Home</Text>}
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={handleNotifications}
    //     style={
    //       notificationsScreen
    //         ? { ...styles.bgiconContainer }
    //         : styles.iconContainer
    //     }
    //   >
    //     <Feather
    //       name="bell"
    //       size={24}
    //       color={notificationsScreen ? "#ffffff" : "black"}
    //     />
    //     <View style={styles.notificationContainer}>
    //       <Text style={styles.notificationCount}>01</Text>
    //     </View>
    //     {notificationsScreen && <Text style={styles.iconText}>Notifications</Text>}

    //   </TouchableOpacity>

    //   <TouchableOpacity
    //     onPress={handleAccount}
    //     style={
    //       accountScreen ? styles.bgiconContainer : styles.iconContainer
    //     }
    //   >
    //     <FontAwesome5
    //       name="user-circle"
    //       size={24}
    //       color={accountScreen ? "#ffffff" : "black"}
    //     />
    //     {accountScreen && <Text style={styles.iconText}>Account</Text>}

    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={handleCart}
    //     style={cartScreen ? styles.bgiconContainer : styles.iconContainer}
    //   >
    //     <EvilIcons
    //       name="cart"
    //       size={24}
    //       color={cartScreen ? "#ffffff" : "black"}
    //     />
    //     <View style={styles.notificationContainer}>
    //       <Text style={styles.Cart}>{cartSize}</Text>
    //     </View>
    //     {cartScreen && <Text style={styles.iconText}>Cart</Text>}

    //   </TouchableOpacity>
    // </View>

    <View style={styles.footerContainer}>
      {footercomponents.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handlePress(item)}
          style={item.active ? styles.bgiconContainer : styles.iconContainer}
        >
          {item.icon}
          {item.active && <Text style={styles.iconText}>{item.options}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    zIndex: 99,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  bgiconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D8A144",
    flex: 1,
    padding: 15,
    borderRadius: 15,
  },
  notificationContainer: {
    position: "relative",
  },
  notificationCount: {
    fontSize: 9,
    padding: 3,
    fontWeight: "900",
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    position: "absolute",
    top: -20,
    right: -1,
  },
  Cart: {
    fontSize: 11,
    padding: 3,
    fontWeight: "bold",
    backgroundColor: "blue",
    color: "white",
    borderRadius: 10,
    position: "absolute",
    top: -20,
    right: -2,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffff",
    paddingLeft: 10,
  },
});

export default Footer;
