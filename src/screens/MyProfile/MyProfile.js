import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

 class MyProfile extends Component {
    constructor(props) {
        super(props);
            this.state = {
            posts: [],
            user: []  
            }
    }
    componentDidMount(){
        if (auth.currentUser) {
            /*db.collection('posts')
            .where('owner','==', auth.currentUser.email)
            .onSnapshot((docs) => {
                let posteos = []
                docs.forEach((doc) => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posteos,
                })
            })*/
            db.collection('users')
            .where('owner','==', auth.currentUser.email)
            .onSnapshot((docs) => {
                let usuario = []
                docs.forEach((doc) => {
                    usuario.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    user: usuario[0].data
                })
            })   
          }
    }

    signOut() {
        auth.signOut()
        this.props.navigation.navigate('Login')
      }

    render() {
        console.log(auth.currentUser)
        console.log(this.state.user)
        return (
          
            <View>
                <Text style={styles.infoLogin}>TU PERFIL</Text>
                <Text style={styles.infoLogin1}>{this.state.user.name}</Text>
                <Text style={styles.infoLogin}>Biografia</Text>
                <Text style={styles.infoLogin}>{this.state.user.biografia}</Text>
                <Text style={styles.infoLogin}>Email: {this.state.user.owner}</Text>
                <Text style={styles.infoLogin}>Cantidad de posteos: {this.state.posts.length}</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <Post postData={item}/>}
                />
                 <TouchableOpacity style={styles.contain}onPress={()=>this.signOut()}>
                    <Text style={styles.button}>CERRAR SESION</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    contain:{
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        backgroundColor: "rgb(245, 32, 32)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 15,
        textAlign: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(0,0,0)",
        width: '30%',
        marginBottom: 15,
        alignSelf: 'center',
      },

      infoLogin:{
        fontSize: 16,
        fontWeight: `bold`,
        textAlign: `center`,
        marginBottom: 10,
        marginTop: 10,
      },

      infoLogin1:{
        fontSize: 29,
        fontWeight: `bold`,
        textAlign: `center`,
        marginBottom: 10,
        marginTop: 10,
        color: "#E5E24A",
        fontFamily: 'Montserrat'
      },
     
})

export default MyProfile;