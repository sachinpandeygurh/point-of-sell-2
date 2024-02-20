import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    retrieveData();
  }, [auth]);

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
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>About {auth?.name}</Text>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.card}>
            <Text style={styles.heading}>User Name: {auth?.name}</Text>
            <View style={styles.hr} />
            <Text style={styles.heading}>User Email: {auth?.email}</Text>
            <View style={styles.hr} />
            <Text style={styles.heading}>User Number: {auth?.phone}</Text>
            <View style={styles.hr} />
            <Text style={styles.heading}>User Address: {auth?.address}</Text>
            <View style={styles.hr} />
            <Text style={styles.heading}>User Pincode: {auth?.pincode}</Text>
          </View>
        </View>
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    fontWeight: "bold",
    alignItems: "center",

  },
  sidebar: {
    flex: 1,
    marginTop: 15,
  },
  mainContent: {
    flex: 2,
    width: 350
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  heading: {
    fontWeight: 'bold',
  },
  hr: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default Dashboard;
