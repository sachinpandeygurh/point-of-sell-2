import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    retrieveData();
  
  }, []);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@MySuperStore:key");
      if (value !== null) {
        const authData = JSON.parse(value);
        
    if(authData._id){
      navigation.navigate("index");
      alert('user already login ')
    }
      }
    } catch (error) {
      console.error(error);
    }
  };



  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://dptf.onrender.com/api/v1/auth/login", {
        email,
        password,
      });
      console.log("res", res?.data);
      if (res && res.data.success) {
        // Save data to AsyncStorage
        await AsyncStorage.setItem("@MySuperStore:key", JSON.stringify(res?.data?.user));
        console.log("Data stored successfully!");

        Alert.alert("login", "successfully!");

        navigation.navigate("index");
        console.log("Navigation successful!");
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email.toLowerCase()}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Your Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Enter Your Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "column", alignContent: "center", justifyContent: "space-between", width: "90%", marginTop: 10 }} >
        <TouchableOpacity style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }} onPress={() => navigation.navigate('signup')}>
          <Text style={{paddingRight:20}}>New Customer? </Text>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.policyText}>
        <TouchableOpacity style={styles.policytxt} onPress={() => navigation.navigate("Policy")}>
          <Text style={styles.linkText}>Terms of Use</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.policytxt} onPress={() => navigation.navigate("Policy")}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:100,
    //   flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: '#ffa502',
    borderRadius: 80,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    // fontSize: 50, // Uncomment if you want to increase the font size
  },
  linkText: {
    textDecorationLine: 'underline',
    color: 'blue',
    letterSpacing: 1, // There's a typo here. It should be 'letterSpacing', not 'tEXTspace'
    //   paddingVertical: 10,
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  policyText: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    //   marginTop: 10,
  },
  policytxt: {
    padding: 20,
  },
});

export default Login;
