import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { auth, db, storage } from '../../firebase/config';
import Post from '../../components/Post/Post';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchUserPosts();
  }

  fetchUserData() {
    const currentUser = auth.currentUser;

    currentUser & db.collection('users')
      .where('owner', '==', currentUser.email)
      .onSnapshot((docs) => {

        let user = []
        docs.forEach(doc => {
          user.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({ user: user[0] });
      });
  }

  fetchUserPosts() {
    const currentUser = auth.currentUser;

    db.collection('posts')
      .where('owner', '==', currentUser.email)
      .onSnapshot((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({
            id: doc.id,
            datos: doc.data(),
          });
        });
        this.setState({
          posts: posts,
        });
      });
  }

  deletePost(postId) {
    db.collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        console.log("Post successfully deleted!");
        // Actualizar la lista de posts después de borrar uno
        this.fetchUserPosts();
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
      });
  }

  signOut() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
        this.forceUpdate();
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  render() {
    const { user, posts } = this.state;

    if (!user) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textUsername}>Username: {user.data.name}</Text>
        <Text style={styles.textEmail}>Email: {user.data.owner}</Text>
        <Text style={styles.textMiniBio}>Mini Bio: {user.data.biografia || 'No mini bio available'}</Text>

        {user.profileImageUrl && (
          <Image source={{ uri: user.profileImageUrl }} style={styles.profileImage} />
        )}

        <Text style={styles.textTotalPosts}>Total Posts: {posts.length}</Text>

        <FlatList
          style={styles.posts}
          data={posts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => { return <Post infoPost={item} navigation={this.props.navigation} />; }}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={() => this.signOut()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    color: 'red',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  textUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  textMiniBio: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTotalPosts: {
    fontSize: 16,
    marginBottom: 8,
  },
  textPost: {
    fontSize: 16,
    marginBottom: 8,
  },
  textLoading: {
    fontSize: 18,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyProfile;
