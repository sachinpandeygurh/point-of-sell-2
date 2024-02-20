import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LocationComponent from "../../components/Location";
import Products from "../../components/Products";
const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#f2f2f2", "#D8A144"]} style={{ flex: 1 }}>
        <Header />
        <ScrollView style={{ zIndex: 1, marginVertical: 80 }}>
          <LocationComponent />
          {/* <Carusel /> */}
          <Products />
        </ScrollView>
        <Footer />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
