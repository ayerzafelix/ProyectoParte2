import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from "../screens/Home/Home";
import MyProfile from '../screens/MyProfile/MyProfile';
import Buscador from '../screens/Buscador/Buscador';
import AddPost from '../screens/AddPost/AddPost';

const Tab = createBottomTabNavigator();

export default function TabNavigation(){
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options = {{ headerShown: false }}/> 
            <Tab.Screen name="Buscador" component={Buscador} options = {{  headerShown: false}}/>
            <Tab.Screen name="AddPost" component={AddPost} options = {{  headerShown: false}}/>
            <Tab.Screen name="MyProfile" component={MyProfile} options = {{  headerShown: false }}/>        
        </Tab.Navigator>
    )
}