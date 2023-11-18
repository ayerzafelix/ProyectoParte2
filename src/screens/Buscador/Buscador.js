import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from "../../firebase/config"
import { FontAwesome } from '@expo/vector-icons';

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            busqueda: '',
            resultados: [],
            mensaje: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: users,
            });
            console.log("Usuarios:", users);
        })
    }

    controlarCambios(text) {
        this.setState({
            busqueda: text
        })
    }

    buscarUsuarios() {
        const busquedaLower = this.state.busqueda.toLowerCase();

        const resultados = this.state.usuarios.filter((usuario) => {
            const userName = usuario.data.name || '';
            return userName.toLowerCase().includes(busquedaLower);
        });

        if (resultados.length === 0) {
            this.setState({
                resultados: [],
                mensaje: 'No hay resultados que coincidan.',
            });
        } else {
            this.setState({
                resultados: resultados,
                mensaje: '',
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Buscar...'
                    onChangeText={(text) => this.controlarCambios(text)}
                    value={this.state.busqueda}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.buscarUsuarios()}
                >
                    <Text style={styles.buttonText}>Search</Text>
                    <br />
                    <br />
                    <FontAwesome name="search" size={24} color="black" />
                </TouchableOpacity>

                {this.state.mensaje ? (
                    <Text style={styles.mensaje}>{this.state.mensaje}</Text>
                ) : (
                    <FlatList
                        data={this.state.resultados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.Conteiner}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                    'FriendProfile', { user: item.data.owner })}>
                                    <Text style={styles.user}>User Name: {item.data.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 5,
    },
    searchIcon: {
        marginLeft: 5,
    },
    mensaje: {
        fontSize: 16,
        marginBottom: 10,
        color: '#e74c3c',
        textAlign: 'center',
    },
    Conteiner: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    user: {
        fontSize: 16,
    },
});


export default Buscador;