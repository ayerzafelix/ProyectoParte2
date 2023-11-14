import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPost from '../../screens/AddPost/AddPost'
import Home from '../../screens/Home/Home';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register/Register';
import MyProfile from '../../screens/MyProfile/MyProfile';
import { auth } from '../../firebase/config';
import Buscador from '../../screens/Buscador/Buscador';
import Icon  from 'react-native-vector-icons/FontAwesome';


const Tab  = createBottomTabNavigator();

class MenuBar extends Component {  

    constructor(props) {
        super(props);
            this.state = {
                errorMessage:'',
                errorCode:'',
                logueado: false,
                user: '',
            }
    }

componentDidMount(){
    auth.onAuthStateChanged(user =>{
        if (user){
            this.setState({
                logueado: true,
                user: user
            })
        }
    })
}

    render() {
        return (
            
            <NavigationContainer>
                {this.state.logueado ?(
                   <Tab.Navigator screenOptions={({route}) => ({tabBarIcon: ({color}) => screenOptions(route, color)})}>
                      <Tab.Screen options = {{headerShown: false}} name="Home" component={() => <Home />} />
                      <Tab.Screen options = {{headerShown: false}} name="Buscador" component={() => <Buscador />} />
                      <Tab.Screen options = {{headerShown: false,lazy: true }} name="AddPost" component={(drawerProps) => <AddPost drawerProps={drawerProps}/>} />
                      <Tab.Screen options = {{headerShown: false}} name="MyProfile" component={() => <MyProfile logout={()=>this.logout()}/>} />    
                   </Tab.Navigator>)
                   : 
                   (<Tab.Navigator screenOptions={({route}) => ({tabBarIcon: ({color}) => screenOptions(route, color)})}>
                      <Tab.Screen options = {{headerShown: false}} name="Register" component={() => <Register/>} />
                      <Tab.Screen options = {{headerShown: false}} name="Login" component={() => <Login />} />
                   </Tab.Navigator>  
                )}
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({})

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'MyProfile':
        iconName = 'user-circle';
        break;
      case 'AddPost':
        iconName = 'plus';
        break;
    case 'Login':
        iconName = 'login';
        break;
    case 'Register':
        iconName = 'register';
        break;
    case 'Buscador':
        iconName = 'search';
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  }

export default MenuBar;