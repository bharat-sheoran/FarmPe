import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-native';
import { ReqIP } from '@env';

export default function EditPostScreen({ route, navigation }) {
    const user = useSelector((state) => state.user.user);
    const [data, setData] = useState({
        id: route.params.data.id,
        title: route.params.data.title,
        description: route.params.data.description,
        amountRequired: route.params.data.amountRequired,
        country: route.params.data.country,
        location: route.params.data.location,
        imageUrl: route.params.data.image.url,
        price: route.params.data.price,
        owner: user.id
    })

    function handleInputChange(key, value) {
        setData({
            ...data,
            [key]: value
        });
    }

    const handleSubmit = async () => {
        console.log(data);
        const response = await axios.put(`http://${ReqIP}:8080/home/${data.id}`, { data });
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <CustomTextInput
                    placeholder="Title"
                    value={data.title}
                    onChangeText={(text) => handleInputChange('title', text)}
                />
                <CustomTextInput
                    placeholder="Description"
                    value={data.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline
                    style={styles.messageInput}
                />
                <CustomTextInput
                    placeholder="Country"
                    value={data.country}
                    onChangeText={(text) => handleInputChange('country', text)}
                />
                <CustomTextInput
                    placeholder="Location"
                    value={data.location}
                    onChangeText={(text) => handleInputChange('location', text)}
                />
                <CustomTextInput
                    placeholder="Amount Required"
                    keyboardType="numeric"
                    value={data.amountRequired.toString()}
                    onChangeText={(text) => handleInputChange('amountRequired', text)}
                />
                <CustomTextInput
                    placeholder="Price"
                    keyboardType="numeric"
                    value={data.price.toString()}
                    onChangeText={(text) => handleInputChange('price', text)}
                />
                <CustomButton title="Submit" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

const CustomTextInput = ({ placeholder, value, onChangeText, multiline, style }) => {
    return (
        <TextInput
            style={[styles.input, styles.customInput, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
        />
    );
};

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 45,
        backgroundColor: '#fff', // Set a background color for the container
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        width: '100%',
    },
    customInput: {
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
        color: '#333',
    },
    messageInput: {
        height: 100,
    },
    buttonContainer: {
        backgroundColor: '#4D6AFF',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
