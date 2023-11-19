import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home/Home'
import Buscador from '../../screens/Buscador/Buscador'
import FriendProfile from '../../screens/FriendProfile/FriendProfile'

const Stack = createNativeStackNavigator()

class BuscadorNavigation extends Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Buscador' component={Buscador} options={{ headerShown: false }} />
        <Stack.Screen name='FriendProfile' component={FriendProfile} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />

      </Stack.Navigator>
    )
  }
}

export default BuscadorNavigation