import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            errors: ''
        }
    }

    loguearUsuario (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
             .then(() => {
                 this.setState({
                  email: '',
                  password: '',
                  errors: ''})
                 })
            .catch(error => {
                this.setState({
                    errors: `Error al intentar loguerse: ${error.message}`
            })
         })
    }

    render(){
        return(
            <View style={styles.contenedor}>
              <Text style={styles.titulo}>Login</Text>
                <View style={styles.formulario}>
                   <TextInput
                    style={styles.lugar}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                   <TextInput
                    style={styles.lugar}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                   />

                {this.state.email === "" || this.state.password === "" ? 
                        <Text style={styles.button}>Done</Text>
                    :
                        <TouchableOpacity onPress={ () => this.loguearUsuario ( this.state.email, this.state.password)}>
                            <Text style={styles.button2}>Done</Text>
                        </TouchableOpacity>
                }
            </View>
             <View>
                 <Text style={styles.error}>{this.state.errors}</Text>
             </View> 
        </View>   
        )
    }
}

const styles = StyleSheet.create({
    
    contenedor:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    formulario:{
        backgroundColor: 'rgb(128, 128, 128)',
        borderRadius: 8,
        padding: 20
    },
        
    titulo:{
        fontFamily: 'monospace',
        fontSize: 40,
        margin: 10,
        color: 'rgb(128, 128, 128)'     
    },    

    lugar: {   
        height: 20,
        fontSize: 15,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        width: '100%',
        marginBottom: 15
    },

    button: {
        backgroundColor: "rgb(192, 192, 192)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 20,
        textAlign: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(105, 105, 105)",
        width: '100%',
        marginBottom: 15
      },

      button2: {
        backgroundColor: "rgb(50, 205, 50)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 21,
        textAlign: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(105, 105, 105)",
        width: '100%',
        marginBottom: 15
      },

      textButton: {
        color: "black",
      },

      imagen: {
        height:250,
        borderRadius: 15,  
      },
      
      error: {
          color: "red",
      }
})


export default Login;