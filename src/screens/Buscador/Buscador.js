import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../firebase/config';

const Buscador = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    db.collection('users')
      .where('userName', '>=', searchText.toLowerCase())
      .where('userName', '<=', searchText.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(users);
        setNoResults(users.length === 0);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  const navigateToProfile = (userId) => {
    // Aquí puedes navegar al perfil del usuario según tu lógica de navegación
    console.log(`Navigate to user profile with ID: ${userId}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por email"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {noResults && <Text style={styles.noResultsText}>El email no existe</Text>}

      <FlatList
        data={searchResults}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem} onPress={() => navigateToProfile(item.id)}>
            <Text>Email: {item.email}</Text>
            <Text>Username: {item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultsText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Buscador;
