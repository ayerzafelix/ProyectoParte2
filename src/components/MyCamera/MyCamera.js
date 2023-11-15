import React, {Component} from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisos:false, //permisos de acceso al hardware para usar la cámara.
            urlInternaFoto: '', //aca va la url temporal interna de la foto.
            mostrarCamara: true,
        }
        this.metodosDeCamara = '' //referenciar a los métodos internos del componente camera.
    }

    componentDidMount(){
       //Pedir permisos para uso del hardware.
       Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permisos: true
                })
            } )
            .catch( e => console.log(e)) 
    }

    SacarFoto(){
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //La ruta interna de la foto en la computadora.
                    mostrarCamara: false //escondemos la cámara para mostrar un preview de la foto al usuario.
                })
            })
            .catch(e=>console.log(e))
    }

    guardarFoto(){
      fetch(this.state.urlInternaFoto) 
      .then(res=> res.blob())
      .then(imagen => {
          const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
          refStorage.put(imagen)
          .then(()=>{
              refStorage.getDownloadURL()
              .then(url => this.props.onImageUpload(url))
          })
          .then(()=>{
              this.setState({
                  mostrarCamara:false
          })
      })
      })
      .catch(e=> console.log(e))
  }

    cancelar(){
      this.setState({
          urlInternaFoto: '',
          mostrarCamara:true
      }) 
  }
    render(){
        return(
            <View style={ styles.container}>

                {
                    this.state.permisos ?
                        this.state.mostrarCamara === false ?
                        //Preview
                        <React.Fragment>
                            <Image 
                                source={{uri:this.state.urlInternaFoto}}
                                style={ styles.cameraBody }
                            />
                            {/* Corregir estilos para que se vea la imagen */}
                            {/* Corregir estilos para que los botones desaparezcan una vez que el usuario aceptó o canceló el preview */}
                            <TouchableOpacity style = { styles.button } onPress={ () => this.guardarFoto() }>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = { styles.button } onPress={ () => this.cancelar() }>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                        
                        :
                        //Cámara.
                        <React.Fragment>
                        {/* Corregir estilos para que se vea bien la cámara */}
                            <Camera 
                                type={Camera.Constants.Type.front}
                                ref= { metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                style = { styles.cameraBody }
                            />
                            <TouchableOpacity  style = { styles.button } onPress={()=> this.SacarFoto()}>
                                <Text>Sacar Foto</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    :
                    <Text>La cámara no tiene permisos</Text>

                }
            </View>
        )
    }


}

const styles = StyleSheet.create({
  container: {
    
    height: 600,
  },
  cameraBody: {
    height: '50vh',
        width: '100vw',
        position: 'absolute',
        marginTop:50
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
});

export default MyCamera
