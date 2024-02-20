import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Loding from '../loding';
const PrintOrderDetails = () => {
  const [auth, setAuth] = useState(null);
const [orders , setOrders] = useState([])
  useEffect(() => {
  retrieveData();
  getOrders()
    async function initializeRNHTMLtoPDF() {
      if (RNHTMLtoPDF) {
        try {
          await RNHTMLtoPDF?.init({});
          console.log('RNHTMLtoPDF initialized successfully');
        } catch (error) {
          console.error('Error initializing RNHTMLtoPDF:', error);
        }
      }
    }
  
    initializeRNHTMLtoPDF();
  }, [auth, orders]);

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

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`https://dptf.onrender.com/api/v1/payment/single-order/${auth._id}`);
      setOrders(data?.order);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrintPress = async () => {
    if (orders && orders.length > 0) {
      const htmlContent = generateHTMLContent();
      const options = {
        html: htmlContent,
        fileName: 'order',
        directory: 'Documents',
      };
      console.log("options", options)
  
      const file = await RNHTMLtoPDF?.convert(options);
      console.log('PDF file:', file);
    } else {
      console.error('Orders data is empty');
    }
  };

  const generateHTMLContent = async () => {
    const userHTML = `
      <div style="flex: 1; background-color: #ffffff;">
        <div style="padding: 20px;">
          <div style="font-weight: bold; font-size: 20px;">About ${auth?.name}</div>
        </div>
    
        <div style="margin-top: 20px;">
          <div style="border-width: 1px; border-color: #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="font-weight: bold; font-size: 16px;">User Name: ${auth?.name ? auth?.name : ""}</div>
            <div style="border-bottom-width: 1px; border-bottom-color: #ddd; margin-vertical: 8px;"></div>
            <div style="font-weight: bold; font-size: 16px;">User Email: ${auth?.email ? auth?.email : ""}</div>
            <div style="border-bottom-width: 1px; border-bottom-color: #ddd; margin-vertical: 8px;"></div>
            <div style="font-weight: bold; font-size: 16px;">User Number: ${auth?.phone ? auth?.phone : ""}</div>
            <div style="border-bottom-width: 1px; border-bottom-color: #ddd; margin-vertical: 8px;"></div>
            <div style="font-weight: bold; font-size: 16px;">User Address: ${auth?.address ? auth?.address : ""}</div>
            <div style="border-bottom-width: 1px; border-bottom-color: #ddd; margin-vertical: 8px;"></div>
            <div style="font-weight: bold; font-size: 16px;">User Pincode: ${auth?.pincode ? auth?.pincode : ""}</div>
          </div>
        </div>
      </div>
    `;
  
    const ordersHTML = await orders
      .map((o, i) => `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <div style="flex-direction: row; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: bold;">Order ID: ${o?.razorpay?.orderId ? o?.razorpay?.orderId : ""}</span>
            <span style="color: ${o?.status === 'Not Process' ? 'red' : 'green'};">${o?.status ? o?.status : ""}</span>
          </div>
          <div>
            <p>${o?.buyer?.address ? o?.buyer?.address : ""}</p>
            <p>${o?.buyer?.address ? new Date(o?.createdAt).toLocaleDateString() : ""}</p>
            <p>${o?.isPaid ? 'Success' : 'Failed'}</p>
            <p>${o?.paymentMode ? 'Online' : 'Cash'}</p>
            <p>${o?.item?.length ? o?.item?.length : ""} Items</p>
          </div>
          <div style="flex-direction: row; margin-right: 8px;">
            ${o?.item && o?.item?.map((p, j) => `
              <div style="flex-direction: row; margin-right: 8px;">
                <img src="https://dptf.onrender.com/api/v1/item/get-photo/${p?.item}" style="width: 100px; height: 100px; border-radius: 8px;" />
                <div style="margin-left: 8px;">
                  <p>${p.schedule ? p.schedule : ""}</p>
                  <p>${p.price ? p.price : ""}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `)
      .join('');
  
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
          </style>
        </head>
        <body>
          <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 16px;">All Orders</h1>
          ${ordersHTML}
          ${userHTML}
        </body>
      </html>
    `;
  };
  
  return (
    <ScrollView >
      {orders && orders?.length > 0 ? (
        <Pressable onPress={handlePrintPress} style={{ marginTop: 20, padding: 10, backgroundColor: 'gray', position: 'relative', width: 100, borderRadius: 5 , flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
          <Text style={{ color: '#fff', fontWeight: "bold" }}>Print </Text>
        </Pressable>
      ) : (<Loding/>)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  column: {
    padding: 20,
  },
  mainContent: {
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 8,
  },
  printButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    width: 100,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default PrintOrderDetails;
