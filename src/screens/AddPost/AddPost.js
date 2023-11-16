import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamera/MyCamera';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      textoPost: '',
      fotoUrl: '',
      createdAt: '',
      
    };
  }

  addPost(owner, textoPost, fotoUrl, createdAt) {
    // Crear la colección Users
    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        textoPost: this.state.textoPost,
        fotoUrl: fotoUrl,
        likes: [],
        comentarios: [],
        createdAt: Date.now(),
      })
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((e) => console.log(e));
  }

  urlDeFoto(url) {
    this.setState({
      fotoUrl: url,
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <Text style={styles.headerText}>New Post</Text>
            <MyCamera style={styles.camera} urlDeFoto={(url) => this.urlDeFoto(url)} />
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ textoPost: text })}
              placeholder="Write something..."
              keyboardType="default"
              value={this.state.textoPost}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.addPost(
                  auth.currentUser.email,
                  this.state.textoPost,
                  this.state.fotoUrl,
                  Date.now()
                )
              }
            >
              <Text style={styles.textButton}>Post</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default AddPost;
