/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, Alert} from 'react-native';
import * as firebase from 'firebase';
import styles from './styles.js';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  //authDomain: "jewishchart-f8b3c.firebaseapp.com",
  databaseURL: "https://jewishchart-f8b3c.firebaseio.com",
  //storageBucket: "<your-storage-bucket>"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseApp = {};
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class checknew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      promptVisible: false
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp
      .database()
      .ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child
            .val()
            .title,
          _key: child.key
        });
      });

      console.log(items);
      
      var items = ["check","check2"];
      
      this.setState({
        dataSource: ds.cloneWithRows(items)
      });

    });  
  }

  // listenForItems() {

  //     var items = ["check","check2"];
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(items)
  //     });
  // }  

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    // this.listenForItems();
  }

  _renderItem(item) {

    const onPress = () => {
      Alert.alert('Complete', null, [
        {
          text: 'Complete',
          onPress: (text) => this.itemsRef.child(item._key).remove()
        }, {
          text: 'Cancel',
          onPress: (text) => console.log('Cancelled')
        }
      ]);
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'red'}}>and red</Text>      
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <View><Text>{data}</Text></View>}          
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }

}

//renderRow={this._renderItem.bind(this)}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });

AppRegistry.registerComponent('checknew', () => checknew);
