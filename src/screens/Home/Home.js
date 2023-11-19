import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            listaPost: [],
        };
    }

    componentDidMount() {
        db.collection('posts').onSnapshot((posteos) => {
            let postsAMostrar = [];

            posteos.forEach((unPost) => {
                postsAMostrar.push({
                    id: unPost.id,
                    datos: unPost.data(),
                });
            });
            this.setState({
                listaPost: postsAMostrar,
            });
        });
    }

    signOut() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>

                <View style={styles.logoSignOut}>
                    <TouchableOpacity onPress={this.signOut}>
                        <FontAwesome name="sign-out" size={30} color="red" />
                        <Text style={styles.textoSignOut}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.titulo}>HOME</Text>
                </View>


                <Text style={styles.postListTitle}>Lista de Posts</Text>
                {this.state.listaPost.length === 0 ? (
                    <Text style={styles.loadingText}>Cargando...</Text>
                ) : (
                    <FlatList
                        data={this.state.listaPost}
                        keyExtractor={(unPost) => unPost.id.toString()}
                        renderItem={({ item }) => <Post infoPost={item} navigation={this.props.navigation} />}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    textoSignOut: {
        color: 'red',
        fontSize: '30',
        fontWeight: 'bold'
    },

    logoSignOut: {
        position: 'absolute',
        top: 20,
        right: 20,
        marginBottom: 20,
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutText: {
        color: 'black',
        marginTop: 10,
    },
    postListTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    loadingText: {
        marginTop: 20,
    },
});

export default Home;
