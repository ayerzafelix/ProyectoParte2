import React, { Component } from 'react';
import {auth, db} from '../../firebase/config';
import {Text, View, FlatList, StyleSheet} from 'react-native'
import Post from '../../components/Post/Post'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            posts:[]
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts
                    })
                }) 
            }
        )
    }


    render(){
        return(
            <>
                <Text style={styles.text}> HOME </Text>
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={ onePost => onePost.id.toString()}
                    renderItem={ ({item}) => <Post postData={item} navigation={this.props.navigation}/>}
                />  
            </>
        )
    }
}

const styles= StyleSheet.create ({

    text: {
        fontFamily: 'Arial, sans-serif',
        color: '#2c3e50',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        backgroundColor: '#ecf0f1',
        marginBottom: 20,
        marginTop: 20,
      },
})

export default Home



    