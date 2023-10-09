import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {auth} from ".src/firebase/config";
import { registerRootComponent } from 'expo';


export default function App() {

  function register(email, pass){
    auth.createUserWithEmailAndPassword(email, pass)
     .then( response => {
         console.log(response);
      })     
     .catch( error => {
       console.log(error);
     })
  }

  function login(email, pass){
    auth.signInWithEmailAndPassword(email, pass)
     .then((response) => {
         console.log(response);
     })
     .catch(error => {
       console.log(error);
     })
  }
 

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
