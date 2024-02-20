import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Picker, Image, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Loding from '../loding';
const Orders = () => {
  const [status] = useState(['Not Process', 'Processing', 'Shipped', 'delivered', 'cancel']);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null) {
          const authData = JSON.parse(value);
          setAuth(authData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    retrieveData();
    getOrders();
  }, [auth]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`https://dptf.onrender.com/api/v1/payment/single-order/${auth._id}`);
      setOrders(data?.order);
   
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>All Orders</Text>
      {orders.length > 0 ?
        (orders?.map((o, i) => (
          <View style={styles.orderContainer} key={i}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{o?.razorpay?.orderId}</Text>
              <Text style={{ color: o?.status === 'Not Process' ? 'red' : 'green' }}>{o?.status}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text><Text style={{fontWeight:"bold", paddingRight:10}}> Address: </Text>{o?.buyer?.address? o?.buyer?.address :"Not available "}</Text>
              <Text><Text style={{fontWeight:"bold", paddingRight:10}}> Order date: </Text>{new Date(o?.createdAt).toLocaleDateString()}</Text>
              <Text><Text style={{fontWeight:"bold", paddingRight:10}}> Payrment: </Text>{o?.isPaid ? 'Success' : 'Failed'}</Text>
              <Text><Text style={{fontWeight:"bold", paddingRight:10}}> PaymentMode: </Text>{o?.paymentMode ? 'Online' : 'Cash'}</Text>
              <Text><Text style={{fontWeight:"bold", paddingRight:10}}> Quentity: </Text>{o?.item?.length} </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {o?.item?.map((p, j) => (
                <View style={styles.productCard} key={j}>
                  <Image
                    source={{ uri: `https://dptf.onrender.com/api/v1/item/get-photo/${p?.item}` }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text>{p.schedule}</Text>
                    <Text>{p.price}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))):(
        <Loding/>
        
        )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
  },
  orderStatus: {
    color: 'blue',
  },
  orderDetails: {
    marginBottom: 8,
  },
  productCard: {
    flexDirection: 'row',
    marginRight: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 8,
  },
  statusPicker: {
    marginVertical: 8,
  },
  
});

export default Orders;
