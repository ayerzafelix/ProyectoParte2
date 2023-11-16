import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, } from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            listaPost: [],
        };
    }

    componentDidMount() {
        // Traer datos
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

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>HOME</Text>
                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.postListTitle}>Lista de Posts</Text>
                {this.state.listaPost.length === 0 ? (
                    <Text style={styles.loadingText}>Cargando...</Text>
                ) : (
                    <FlatList
                        data={this.state.listaPost}
                        keyExtractor={(unPost) => unPost.id}
                        renderItem={({ item }) => <Post infoPost={item} />}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
