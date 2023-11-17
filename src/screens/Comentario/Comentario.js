import React, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Comentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elComentario: '',
      id: '',
      data: {},
    };
  }

  componentDidMount() {
    db.collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc=>{
        this.setState({id:doc.id,data:doc.data()})
    })
  }

  agregarComenrtario(id, comentario) {
    db.collection('posts')
      .doc(id)
      .update({
        commentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comentario: this.state.comentario,
        }),
      })
  }

  render() {
    return (
      <View>
        {this.state.data.commentarios && this.state.data.commentarios.length === 0 ? (
          <View style={styles.texto}>
            <Text>No hay comentarios aún</Text>
          </View>
        ) : (
          <View>
                <FlatList
                  data={this.state.data.comentarios}
                  keyExtractor={item => item.createdAt.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                      <Text style={styles.ownerText}>{item.owner}:</Text>
                      <Text style={styles.commentText}>{item.comentario}</Text>
                    </View>
                  )}
                />
              </View>
        )}

        <View style={styles.boton}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ elComentario: text })}
            keyboardType="default"
            placeholder="Agrega un comentario"
            value={this.state.elComentario}
          />

          <TouchableOpacity onPress={() => this.agregarComenrtario(this.state.id, this.state.elComentario)}>
            <Text>Enviar comentario</Text>
          </TouchableOpacity>
        </View>

        <Text onPress={() => this.props.navigation.navigate('TabNavigation')}>Volver al inicio</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boton: {},
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  texto: {
    marginBottom: 10,
  },
  textox: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Comentario;
