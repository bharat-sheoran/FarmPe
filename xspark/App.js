import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import HomeScreen from './screens/HomeScreen.js';
import EditPostScreen from './screens/EditPostScreen.js';
import NewPostScreen from './screens/NewPostScreen.js';
import ShowPostScreen from './screens/ShowPostScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import WelcomeScreen from './screens/WelcomeScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import { View, Text, StyleSheet } from 'react-native';
import background from './components/auth/Background.js';

export default function App() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const retrievedUser = await AsyncStorage.getItem('user');
      console.log(retrievedUser)
      if (retrievedUser !== null) {
        setUser(JSON.parse(retrievedUser));
      } else {
        console.log("You're not logged in");
        setUser(false);
      }
    } catch (error) {
      console.log(error);
      setUser(false);
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ title: 'Welcome', headerShown: false }} />

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ title: 'Login', headerShown: false }} />

          <Stack.Screen
            name='Signup'
            component={SignupScreen}
            screenOptions={{ headerShown: false }}
            options={{ title: 'Sign up', headerShown: false }} />
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            initialParams={getUser}
            options={{
              title: 'FarmPe', header: (props) =>
              (
                <View style={{ height: 170, paddingTop: 35, backgroundColor: '#5f8314'}}>
                  <View style={styles.upper}>
                    <View style={styles.left}>
                      <Image style={styles.logo} resizeMode= 'contain' source={require('./components/welcome/assets/WelcomeLogo.png')}></Image>
                    </View>
                    <View style={styles.right}></View>
                  </View>
                  <View style={styles.down}>
                    <TextInput style={styles.input} placeholder= "Search" />
                  </View>
                </View>
              ),
            }} />

          <Stack.Screen
            name='EditPost'
            component={EditPostScreen}
            options={{ title: 'Edit' }} />

          <Stack.Screen
            name='NewPost'
            component={NewPostScreen}
            options={{ title: 'New' }} />

          <Stack.Screen
            name='ShowPost'
            component={ShowPostScreen}
            options={{ title: 'Post' }} />

          <Stack.Screen
            name='OrderScreen'
            component={OrderScreen}
            options={{ title: 'Place Order' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  upper: {
    height: '45%',
    display: 'flex',
    flexDirection: 'row'
  },
  down:{
    height: '55%'
  },
  left: {
    width: '50%'
  },
  right: {
    width: '50%'
  },
  logo:{
    width: '50%',
    height: '100%'
  },
  input: {
    backgroundColor: 'white',
    width: '96%',
    height: '80%',
    margin: '2%',
    borderRadius: 10,
    padding: 5
  }
})
