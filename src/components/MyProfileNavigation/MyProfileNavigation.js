import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyProfile from '../../screens/MyProfile/MyProfile'

const Stack = createNativeStackNavigator()

class MyProfileNavigation extends Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='MyProfile'component={MyProfile} logout={() => this.logout()} options={{ headerShown: false }}/>
        <Stack.Screen name='Login'component={Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
    )
  }
}

export default MyProfileNavigation