import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class MyCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisos: false,
      urlInternaFoto: '',
      mostrarCamara: true,
    };
    this.metodosDeCamara = '';
  }

  componentDidMount() {
    Camera.requestCameraPermissionsAsync()
      .then(() => {
        this.setState({
          permisos: true,
        });
      })
      .catch((e) => console.log(e));
  }

  SacarFoto() {
    console.log('sacando foto...');
    this.metodosDeCamara.takePictureAsync()
      .then((foto) => {
        this.setState({
          urlInternaFoto: foto.uri,
          mostrarCamara: false,
        });
      })
      .catch(e => console.log(e));
  }
  guardarFoto() {
    fetch(this.state.urlInternaFoto)
      .then(res => res.blob())
      .then(image => {
        const ruta = storage.ref(`photos/${Date.now()}.jpg`);
        ruta.put(image)
          .then(() => {
            ruta.getDownloadURL()
              .then(url => {
                this.props.urlDeFoto(url);
                this.setState({
                  urlInternaFoto: '',
                  mostrarCamara: true,
                });
              });
          });
      })
      .catch(e => console.log(e));
  }
  cancelar() {
    console.log("Cancelando...");
    this.setState({
      urlInternaFoto: '',
      mostrarCamara: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.permisos ?
          this.state.mostrarCamara === false ?
            <React.Fragment>
              <Image
                style={styles.cameraBody}
                source={{ uri: this.state.urlInternaFoto }}
              />
              <View style={styles.confirm}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => this.cancelar()}>
                  <Text style={styles.textButton}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={() => this.guardarFoto()}>
                  <Text style={styles.textButton}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
            :
            <React.Fragment>
              <Camera
                type={Camera.Constants.Type.front}
                ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                style={styles.cameraBody}

              />
              <TouchableOpacity style={styles.button} onPress={() => this.SacarFoto()}>
                <Entypo name="circular-graph" size={24} color="gray" />
              </TouchableOpacity>
            </React.Fragment>
          :
          <Text>La cámara no tiene permisos</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "45vh",
    alignItems: 'center'
  },
  cameraBody: {
    height: '50vh',
    width: '100vw',
    position: 'absolute',
    marginTop: 50
  },
  confirm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
});

export default MyCamera;
