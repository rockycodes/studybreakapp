import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

//every time i tap the pic, i want a new pic
//need function that randomly selects pic from list and sets that on state
//on Click, run newPic

class UserPage extends React.Component {
  render() {
    let pic = {
      uri:
        'https://www.listenherereviews.com/wp-content/uploads/2014/06/JanelleMonae_Covergirl.jpeg'
    };
    return (
      <View>
        <Image source={pic} style={{ width: 200, height: 400 }} />
      </View>
    );
  }
}
