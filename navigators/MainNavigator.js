import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import NewUserScreen from '../screens/NewUserScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

import {AuthProvider} from '../contexts/AuthContext';

const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    headerMode="screen"
                    screenOptions={{
                      headerTintColor: 'black',
                      headerTitleAlign: "center",
                      headerStyle: { height: 40 },
                    }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="Authorized" component={Authorized} />
                    <Stack.Screen name="NewUser" component={NewUserScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}

function Authorized() {
    return (
        <Stack.Navigator
            headerMode="screen"
            screenOptions={{
            headerTintColor: 'black',
            headerTitleAlign: "center",
            headerStyle: { height: 40 },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  
});