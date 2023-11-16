import React, { Component } from 'react';
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList,} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase'


  
  
  class Comentario extends Component {
    constructor(props){
      super(props)
      this.state = {
        elComentario:'',
        id:'',
        data:{}
      }
    }
  
    componentDidMount(){
      db
      .collection('post')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          id: doc.id,
          data: doc.data(),
        }) }) }


        agregarComenrtario(idDoc, text){
        db
        .collection('post')

        .doc(idDoc)

        .update({
          commentarios: firebase.firestore.FieldValue.arrayUnion({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            comentario: text
          })
        })
      }

      render() {
        return (

          <View>
            {this.state.data?.comments?.length === 0 ?
            <View style={styles.texto}>
              <Text>
                No hay comentarios aún
              </Text> 
              
            </View>
          :
          <View style={styles.texto}>

              <FlatList
              data={this.state.data.comments}
              keyExtractor={item => item.createdAt.toString()}
              renderItem={({item}) => <View>
                <Text style={styles.textox}>{item.owner} comentó:</Text>
                <Text style={styles.textox}>{item.comentario}</Text>
              </View>
                }
              />
            </View>

          }
            
            <View style={styles.boton}>
              <TextInput
                onChangeText={text => this.setState({elComentario: text})}
                keyboardType='default'
                placeholder='Agrega un comentario'
                value={this.state.elComentario}
              />

              <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.elComentario)}>
                <Text>Enviar comentario</Text>
              </TouchableOpacity>
            </View>
  
            <Text onPress={ () => this.props.navigation.navigate ("TabNavigation")} >Volver al inicio</Text>
          </View>
        )
      }

  }

  const styles = StyleSheet.create({
    boton:{},
  })

  export default Comentario