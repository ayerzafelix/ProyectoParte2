import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home/Home'
import AddPost from '../../screens/AddPost/AddPost'
import Buscador from '../../screens/Buscador/Buscador'
import MyProfile from '../../screens/MyProfile/MyProfile'
import FriendProfile from '../../screens/FriendProfile/FriendProfile'
import Post from '../../components/Post/Post'

const Stack = createNativeStackNavigator()

class BuscadorNavigation extends Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Buscador'component={Buscador} options={{ headerShown: false }}/>
        <Stack.Screen name='FriendProfile'component={FriendProfile} options={{ headerShown: false }}/>
      </Stack.Navigator>
    )
  }
}

export default BuscadorNavigation