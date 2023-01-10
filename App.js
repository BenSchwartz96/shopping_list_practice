import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React from 'react';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBAtyfLF2fm2dqv2kXZukbp_YWI2DLjZqI",
  authDomain: "test-30874.firebaseapp.com",
  projectId: "test-30874",
  storageBucket: "test-30874.appspot.com",
  messagingSenderId: "13099037868",
}



export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      lists: [],
      uid: 0,
      loggedInText: 'Please wait, you are being logged in',
    }
    
    

    const firebaseConfig = {
      apiKey: "AIzaSyBAtyfLF2fm2dqv2kXZukbp_YWI2DLjZqI",
      authDomain: "test-30874.firebaseapp.com",
      projectId: "test-30874",
      storageBucket: "test-30874.appspot.com",
      messagingSenderId: "13099037868",
    }

    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    
    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    
  }
//


    componentDidMount() {
      //reference to shoppinglists collection
      this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');

      // listen for collection changes for current user
      this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(this.onCollectionUpdate);

      //authentication
      this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }
      
        //update user state with currently active user data
        this.setState({
          uid: user.uid,
          loggedInText: 'Hello there',
        });

      // create a reference to the active user's documents (shopping lists)
      this.referenceShoppinglistUser = firebase.firestore().collection('shoppinglists').where("uid", "==", this.state.uid);

      });
    }
    
     componentWillUnmount() {
       this.unsubscribeListUser();
       this.authUnsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
      const lists = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        lists.push({
          name: data.name,
          items: data.items.toString(),
        });
      });
      this.setState({
        lists,
      });
    }

    addList() {
      this.referenceShoppingLists.add({
        name: 'TestList',
        items: ['eggs', 'pasta', 'veggies'],
        uid: this.state.uid,
      });
    };


  render(){
  return (
    <View style={styles.container}>
      <Text>{this.state.loggedInText}</Text>

      <Text style={styles.text}>Shopping list data</Text>
      <FlatList
        data={this.state.lists}
        renderItem={({ item }) =>
        <Text style={styles.item}>{item.name}: {item.items}</Text>}
      />


      <Button
      title='Add something'
        onPress={() => {this.addList()}}
      />


    </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 80,
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});
