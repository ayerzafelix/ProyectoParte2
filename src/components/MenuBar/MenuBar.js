import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { auth } from '../../firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register/Register';
import AddPostNavigation from '../../components/AddPostNavigation/AddPostNavigation'
import BuscadorNavigation from '../../components/BuscadorNavigation/BuscadorNavigation';
import MyProfileNavigation from '../../components/MyProfileNavigation/MyProfileNavigation';
import HomeNavigation from '../../components/HomeNavigation/HomeNavigation'
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logueado: false,
            loading: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({ loading: false })
            if (user) {
                this.setState({
                    logueado: true,

                })
            }
        })
    }

    render() {
        if (this.state.loading) {
            return (<View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>)
        }
        console.log(auth.currentUser)
        return (
            <NavigationContainer>
                {this.state.logueado ? (
                    <Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: ({ color }) => screenOptions(route, color) })}>
                        <Tab.Screen options={{ headerShown: false }} name="Home" component={() => <HomeNavigation />} />
                        <Tab.Screen options={{ headerShown: false }} name="Buscador" component={() => <BuscadorNavigation />} />
                        <Tab.Screen options={{ headerShown: false, lazy: true }} name="AddPost" component={(drawerProps) => <AddPostNavigation drawerProps={drawerProps} />} />
                        <Tab.Screen options={{ headerShown: false }} name="MyProfile" component={() => <MyProfileNavigation />} />
                    </Tab.Navigator>)
                    :
                    (<Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: ({ color }) => screenOptions(route, color) })}>
                        <Tab.Screen options={{ headerShown: false }} name="Login" component={() => <Login />} />
                        <Tab.Screen options={{ headerShown: false }} name="Register" component={() => <Register />} />
                    </Tab.Navigator>
                    )}
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

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
            iconName = 'sign-in';
            break;
        case 'Register':
            iconName = 'user-plus';
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