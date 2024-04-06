import { Button } from "react-native"
import { Text, View } from "react-native-animatable"
import Welcome from "../components/welcome/Welcome"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';

export default function WelcomeScreen({navigation}){

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate("Home")
        }, 1500);
    },[]);

    return(
        <Welcome navigation={navigation}/>
    )
}