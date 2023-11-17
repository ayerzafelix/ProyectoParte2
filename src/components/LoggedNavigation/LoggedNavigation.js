import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home/Home'

import AddPost from '../../screens/AddPost/AddPost'




const Stack = createNativeStackNavigator()

export default class LoggedNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
  
         <Stack.Screen
          name='AddPost'
          component={AddPost}

          options={{ headerShown: false }}
        />
 
      </Stack.Navigator>
    )
  }
}