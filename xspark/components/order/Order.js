import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { ReqIP } from '@env';
import Btn from './Btn.js';
import { darkGreen } from './Constants';

export default function Order({ route, navigation }) {
    const data = route.params.data;
    const user = useSelector((state) => state.user.user);
    const [acceptOrder, setAcceptOrder] = useState({
        post: data.id,
        dealPrice: "",
        fromDelivery: "",
        toDelivery: "Ambala",
        trader: data.owner._id,
        farmer: user.id,
        status: "Request Sent"
    })

    function handleInputChange(key, value){
        setAcceptOrder({
            ...acceptOrder,
            [key]: value
        });
    }

    const handleOrderRequest = async ()=>{
        try{
            console.log(acceptOrder);
            const response = await axios.post(`http://${ReqIP}:8080/order`, {acceptOrder});
            console.log(response.data);
        }catch(e){
            console.log(e);
        }
    }

  return (
    <View>
      <Text style={styles.title}>Post: {data.title}</Text>
      <Text style={styles.highlightedPrice}>Price: {data.price}</Text>
  
  
      <View style={styles.container}>

      <Text style={styles.label}>Delivery Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter delivery address"
          value={acceptOrder.fromDelivery}
          onChangeText={(text) => handleInputChange('fromDelivery', text)}
        />

        <Text style={styles.label}>Your Offer Price:</Text>
        <TextInput
          style={styles.input}
          placeholder="Rs1500"
          value={acceptOrder.dealPrice}
          onChangeText={(text) => handleInputChange('dealPrice', text)}
        />
  
       
  
        <View style={styles.buttonContainer}>
          <Btn
            Press={handleOrderRequest}
            title="Request Order"
            bgColor="#9195F6"
            textColor="white"
            btnLabel="Place Order"
          />
        </View>
  
        <View style={styles.buttonContainer}>
          <Btn
            onPress={handleOrderRequest}
            title="Request Order"
            bgColor="white"
            textColor={darkGreen}
            btnLabel="Cancel"
            Press={() => navigation.navigate('Signup')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center', 
      marginBottom: 20, 
      marginTop:10,
    },
    highlightedPrice: {
      fontSize: 26,
      color: darkGreen,
      fontWeight: 'bold', // Make the price bold
      marginBottom: 0, // Add some space below the price
      textAlign: 'center', // Center the text
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
    },
    container: {
      padding: 16,
    },
    buttonContainer: {
        marginTop:30,
      
    },
  });
  
