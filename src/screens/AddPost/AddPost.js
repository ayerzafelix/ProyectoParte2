import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import { db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamera/MyCamera';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoPost: '',
      foto: '',
      showCamera: true,
    };
  }

  newPost(textoPost, foto) {
    db.collection('posts')
      .add({
        owner: auth.currentUser.email,
        textoPost: textoPost,
        foto: foto,
        likes: [],
        comentario: [],
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({
          textoPost: '',
          showCamera: true,
        });
        this.props.navigation.navigate('Home');
      })
      .catch((error) => console.log(error));
  }

  onImageUpload(url) {
    this.setState({
      foto: url,
      showCamera: false,
    });
  }

  render() {
    return (
      <View>
        {this.state.showCamera ? (
          <View>
            <Text style={styles.title}> NEW POST </Text>
            <MyCamera onImageUpload={(url) => this.onImageUpload(url)} />
            <Text style={styles.posteo}> SUBIR POSTEO </Text>
            <TextInput
              placeholder="Texto posteo"
              keyboardType="default"
              style={styles.text}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => this.setState({ textoPost: text })}
              value={this.state.textoPost}
            />

            <TouchableOpacity onPress={() => this.newPost(this.state.textoPost, this.state.foto)}>
              <Text style={styles.input}>Publicar posteo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.input}>aca deberia mostrar algo que lo lleve a que le de permisos "No diste permisos de la camara,
            aprieta para otorgarselos y asi publicar".
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraBody: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  posteo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  text: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    margin: 16,
    minHeight: 100,
  },
  input: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: 12,
    textAlign: 'center',
    borderRadius: 8,
    margin: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPost;
