import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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



class App extends React.Component {

  constructor() {
    super();
    this.state = {
      lists: [],
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
      this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
      this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
    }
    
     componentWillUnmount() {
       this.unsubscribe();
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
    };



  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping list data</Text>
      <FlatList
        data={this.state.lists}
        renderItem={({ item }) =>
        <Text style={styles.item}>{item.name}: {item.items}</Text>}
      />
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,     
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});
