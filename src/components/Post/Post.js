import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cantidadLikes: this.props.postData.data.likes.length,
      miLike: false,
      comentario: this.props.postData.data.comentario.sort((a, b) => b.createdAt - a.createdAt),
    };
  }

  componentDidMount() {
    if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
      this.setState({
        miLike: true,
      });
    }
  }

  like() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          cantidadLikes: this.state.cantidadLikes + 1,
          miLike: true,
        })
      )
      .catch((e) => console.log(e));
  }

  disLike() {
    db.collection('posts')
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          cantidadLikes: this.state.cantidadLikes - 1,
          miLike: false,
        })
      )
      .catch((e) => console.log(e));
  }

  borrarPost() {
    db.collection('posts').doc(this.props.postData.id).delete();
  }

  setComment(comment) {
    const newCommentsArr = this.state.comentario.concat([comment]);
    const sortedArr = newCommentsArr.sort((a, b) => b.createdAt - a.createdAt);
    this.setState({
      comentario: sortedArr,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.foto} source={{ uri: this.props.postData.data.foto }} resizeMode="cover" />

        <TouchableOpacity
          style={styles.text}
          onPress={() => this.props.navigation.navigate('MyProfile', { email: this.props.postData.data.owner })}
        >
          <Text style={styles.text2}>Subido por {this.props.postData.data.owner}</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{this.props.postData.data.textoPost}</Text>

        <View style={styles.iconContainer}>
          {this.state.miLike ? (
            <TouchableOpacity style={styles.icon} onPress={() => this.disLike()}>
              <FontAwesome name="heart" color="#4CAF50" size={28} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.icon} onPress={() => this.like()}>
              <FontAwesome name="heart-o" color="#4CAF50" size={28} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              this.props.navigation.navigate('Comments', {
                id: this.props.postData.id,
                agregarComment: (comment) => this.setComment(comment),
              })
            }
          >
            <FontAwesome name="comment-o" color="#4CAF50" size={28} />
          </TouchableOpacity>
        </View>

        <Text style={styles.textLike}>{this.state.cantidadLikes} likes</Text>

        {this.state.comentario.length === 1 ? (
          <Text style={styles.textComent3}>{this.state.comentario.length} comentario</Text>
        ) : (
          <Text style={styles.textComent3}>{this.state.comentario.length} comentarios</Text>
        )}

        <FlatList
          data={this.state.comentario.slice(0, 4)}
          keyExtractor={(oneComent) => oneComent.createdAt.toString()}
          renderItem={({ item }) => (
            <Text style={styles.textComent}>
              {item.owner} comentó: <Text style={styles.textComent2}> {item.comentario} </Text>
            </Text>
          )}
        />

        {this.props.postData.data.owner === auth.currentUser.email ? (
          <TouchableOpacity style={styles.text} onPress={() => this.borrarPost()}>
            <Text style={styles.borrar}> Borrar este posteo</Text>
          </TouchableOpacity>
        ) : (
          <Text></Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  foto: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    margin: 8,
  },
  text2: {
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  icon: {
    padding: 8,
  },
  textLike: {
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textComent3: {
    marginLeft: 16,
    marginBottom: 4,
    color: '#555',
  },
  textComent: {
    marginLeft: 16,
    marginBottom: 4,
  },
  textComent2: {
    fontWeight: 'bold',
  },
  borrar: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Post;
