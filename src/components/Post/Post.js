import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      cantidadDeLikes: this.props.infoPost.datos.likes.length,
      
    };
  }

  componentDidMount() {
    // Indicar si el post ya está likeado o no.
    if (this.props.infoPost.datos.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      });
    }
  }

  like() {
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then((res) => {
        this.setState({
          like: true,
          cantidadDeLikes: this.props.infoPost.datos.likes.length,
        });
      })
      .catch((e) => console.log(e));
  }

  unLike() {
    db.collection('posts')
      .doc(this.props.infoPost.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then((res) => {
        this.setState({
          like: false,
          cantidadDeLikes: this.props.infoPost.datos.likes.length,
        });
      })
      .catch((e) => console.log(e));
  }

  borrarPost() {
    db.collection('posts').doc(this.props.infoPost.id).delete();
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            source={{ uri: this.props.infoPost.datos.fotoUrl }}
            resizeMode="cover"
            style={styles.postImg}
          />
          <Text style={styles.postText}>Texto: {this.props.infoPost.datos.textoPost}</Text>
          <Text style={styles.postText}>Autor: {this.props.infoPost.datos.owner}</Text>
          <Text style={styles.likeSection}>Cantidad de likes: {this.state.cantidadDeLikes} </Text>
          <Text style={styles.postText}>Cantidad de comentarios: {this.state.cantidadDeComentarios}</Text>


          <View style={styles.actions}>
            {this.state.like ? (
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => this.unLike()}
              >
                <FontAwesome name="heart" color="red" size={28} />
                <Text style={styles.likeButtonText}>Me gusta</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => this.like()}
              >
                <FontAwesome name="heart" color="black" size={28} />
                <Text style={styles.likeButtonText}>No me gusta</Text>
              </TouchableOpacity>
            )}
            {this.props.infoPost.datos.owner === auth.currentUser.email ? (
          <TouchableOpacity style={styles.text} onPress={() => this.borrarPost()}>
            <FontAwesome name="trash-o" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
        
          </View>

          
          <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comentario',
            {id:this.props.id}
            )}>
            <Text style={styles.boton}> Comentar </Text>
          </TouchableOpacity>
        </View>


        
        <View>
      
        </View>

        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  postImg: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  postText: {
    fontSize: 16,
    margin: 10,
  },
  likeSection: {
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButtonText: {
    marginLeft: 5,
  },

  boton:{
    fontFamily: 'Arial',
    fontSize: 16,
    margin: 10,
    backgroundColor: 'rgb(166, 196, 237)',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5
  
  },
});

export default Post;

