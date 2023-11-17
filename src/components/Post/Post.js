import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Modal, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class Post extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      like: false,
      cantidadDeLikes: this.props.infoPost.datos.likes.length,
      mostrarModal: false,
      comentarios: '',
      listaComentarios: null,
      cantidadComentarios: 0 
    }
  }

  componentDidMount() {

    if (this.props.infoPost.datos.likes.includes(auth.currentUser.email)) {
      this.setState({
        like: true,
      })
    }

    if(this.props.infoPost.datos.comentarios){
      this.setState({
          listaComentarios:this.props.infoPost.datos.comentarios,
          cantidadComentarios: this.props.infoPost.datos.comentarios.length
      })
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

  abrirModal() {
    this.setState({
        mostrarModal: true,
    })
}

  cerrarModal() {
    this.setState({
        mostrarModal: false,
    })
}

guardarComentario(){
  console.log ('Guardado comentario')
  let unComentario ={
      createdAt: Date.now (),
      autor: auth.currentUser.displayName,
      comentarios: this.state.comentarios
  }
  db.collection('posts').doc(this.props.infoPost.id).update({
      comentarios: firebase.firestore.FieldValue.arrayUnion(unComentario)
  })
  .then(()=>{
      this.setState({
          comentarios: '',
          listaComentarios: this.props.infoPost.datos.comentarios,
          cantidadComentarios: this.props.infoPost.datos.comentarios.length

      })
  })
}

  borrarPost() {
    db.collection('posts').doc(this.props.infoPost.id).delete();
  }


  comentario(){
    
  }



  render() {
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
          <Text style={styles.likeSection}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>

          <TouchableOpacity onPress={() => this.abrirModal()}>
                    <Text style={styles.meGusta}> {this.state.cantidadComentarios} Comentarios</Text>
          </TouchableOpacity>

          <View style={styles.actions}>

            {this.state.like ? (
              <TouchableOpacity style={styles.likeButton} onPress={() => this.unLike()}>
                <FontAwesome name="heart" color="red" size={28} />
                <Text style={styles.likeButtonText}>Me gusta</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.likeButton}onPress={() => this.like()}>
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

            <TouchableOpacity style={styles.comentario} onPress={()=>this.abrirModal()}>
                <Text>
                    <Icon name="comments" size={30} color="#2099D8" />
                </Text>
            </TouchableOpacity>
        
          </View>
|       
        </View>

        { ! this.state.mostrarModal ?
                       null
                        :
                        <Modal
                                style={styles.modalContainer}
                                visible={this.state.mostrarModal}
                                animationType="slide"
                                transparent={false}
                                >

                                    <TouchableOpacity onPress= {() => this.cerrarModal()} style={styles.closeModal}>
                                        <Text>X</Text>
                                    </TouchableOpacity>
                                    
                                
                                    {
                                this.state.listaComentarios ?
                                
                                <FlatList
                                data={this.state.listaComentarios}
                                keyExtractor={(comentarios) => comentarios.createdAt.toString ()}
                                renderItem={ ({item})=> <Text> {item.autor}: {item.comentarios}</Text> }
                                /> :
                                <Text>Todavía no hay comentarios</Text>
                            }



                        <View>
                        <TextInput 
                            style={styles.textButton}
                            placeholder="Comentar"
                            keyboardType="default"
                            multiline
                            value={this.state.comentarios}
                            onChangeText={texto => this.setState({comentarios: texto})}
                            
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{this.guardarComentario()}} 
                            disabled={this.state.comentarios == '' ? true:false}>
                            <Text style={styles.textButton}>Guadar comentario</Text>
                        </TouchableOpacity>
                        </View>
                        </Modal>
                           
                }
                
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

  modalContainer: {
    width:'100%',  
    flex: 3,
    alignSelf: 'center',
    backgroundColor: "white",
    borderColor: '#000000',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#000000',
},
textButton: {
  color: "black",
},
closeModal:{
  alignSelf: 'flex-end',
  padding: 10,
  backgroundColor: '#dc3545',
  marginTop:2,
  borderRadius: 10,
},
comentario: {
  backgroundColor: "#fde79e",
  backgroundColor: "#",
  paddingHorizontal: 10,
  paddingVertical: 6,
  textAlign: "center",
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: "solid",
  backgroundColor: "#F1F1F1",
  borderColor: "#F1F1F1",
  
},
meGusta: {
  textAlign: "left",
  marginVertical: 10
},
});

export default Post;

