import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SignIn from './components/SignIn';

export default class App extends React.Component {
  
  render() {
    
    return (
      <View style={styles.container}>
        <SignIn/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
