import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Pressable, ImageBackground, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you are using expo for vector icons
import { ReqIP } from '@env';

export default function OrderDetails({ data, PId, TId, navigation }) {
    console.log(PId, TId);
    const [orderData, setOrderData] = useState([]);
    console.log(data);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await axios.get(`http://${ReqIP}:8080/order/${PId}/${TId}`);
                console.log(response.data);
                setOrderData(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        getOrder();
    }, [PId, TId]); // Make sure to include PId and TId as dependencies to useEffect

    console.log(orderData);

    return (
        <View>
            {orderData.map((o, index) => (
                <View key={index} style={{ margin: 10 }}>
                    <Pressable onPress={()=>{Alert.alert("Order Placed Successfully");navigation.navigate("Home")}} style={{ flexDirection: 'row' }}>
                        <View>
                            <ImageBackground
                                imageStyle={{ borderRadius: 6 }}
                                style={{ aspectRatio: 5 / 6, height: 100 }}
                                source={require('./data/assets/d1.jpg')}
                            >
                                {/* Add any necessary child components */}
                            </ImageBackground>
                        </View>

                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{o.farmer.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                <MaterialIcons name="stars" size={24} color="green" />
                                <Text style={{ marginLeft: 3, fontSize: 25, fontWeight: '400' }}>4.6</Text>
                                <Text style={{ marginLeft: 3 }}>.</Text>
                            </View>
                            <Text style={{ fontSize: 17, color: 'grey' }}>Shipping From: {o.fromDelivery}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <View
                                    style={{
                                        backgroundColor: '#FFB6C1',
                                        width: 22,
                                        height: 22,
                                        borderRadius: 11,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: 'white' }}>Rs</Text>
                                </View>

                                <Text style={{ marginTop: 3, marginLeft: 4, fontSize: 14, fontWeight: '500' }}>{o.dealPrice} for {data.amountRequired} Kg.</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            ))}
        </View>
    );
}
