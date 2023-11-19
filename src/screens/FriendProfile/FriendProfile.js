import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../../firebase/config';
import Post from '../../components/Post/Post';

class FriendProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            posts: [],
            info: {},
            user: this.props.route.params.user
        }

    }

    componentDidMount(){
        console.log(this.props.route.params)
        let profile = this.state.user
        db.collection('posts')
        .where ('owner', '==', profile)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                posts: posts
            })
        })
        db.collection('users')
            .where ('owner', '==', this.state.user)
            .onSnapshot (doc => {
                doc.forEach(doc =>
                    this.setState ({
                        id: doc.id,
                        info: doc.data()
                }))
            })

    }

    render(){
        console.log(this.state.info)
        console.log(this.state.posts)

        return(
            <ScrollView style={styles.container}>
                <View style={styles.profileInfo}>
                <Text style={styles.username}>{this.state.info.userName}</Text>
                <Text style={styles.bio}> Biografía:{this.state.info.minibio}</Text>
                <Text style={styles.posts} >Cantidad de posts: {this.state.posts.length}</Text>
                <Image style={styles.profileImage} source={{ uri: this.state.info.profileImage }}/>
                </View> 

                <Text style={styles.sectionTitle}>Posteos:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post infoPost={item} navigation={this.props.navigation} />}
                />
                <Text onPress={() => this.props.navigation.navigate("Home")}>
                Volver a home
                </Text>
            
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
    },
},
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        marginBottom: 5,
    },
    posts: {
        fontSize: 16,
        marginBottom: 15,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default FriendProfile;
