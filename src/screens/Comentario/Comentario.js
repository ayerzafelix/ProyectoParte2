import React, { Component } from 'react';
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList,} from 'react-native';
import { db, auth } from '../../firebase/config';


  
  
  class Comentario extends Component {
    constructor(props){
      super(props)
      this.state = {
        elComentario:'',
        usuario:'',
        data:{}
      }
    }
  
    componentDidMount(){
      db
      .collection('post')
      .doc(this.props.route.params.usuario)
      .onSnapshot(doc => {
        this.setState({
          usuario: doc.usuario,
          data: doc.data(),
        })
      })
    }
  

  }
  
  
  export default Comentario