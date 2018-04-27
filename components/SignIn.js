import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import UserPage from './UserPage';

export default class SignIn extends React.Component {
  state = { buttonPress: false };

  onButtonPress() {
    this.setState({ buttonPress: true });
  }

  renderContent() {
    let pic = {
      uri:
        'http://etcalendar.its.txstate.edu/image/6722/take%20a%20study%20break.jpg'
    };
    if (this.state.buttonPress) {
      return <UserPage />;
    }
    return (
      <View style={styles.container}>
        <Image source={pic} style={{ width: 193, height: 110 }} />
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Laurel"
          color="#f4af41"
          accessibilityLabel="Laurel's login"
        />
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Hannah"
          color="#f49741"
          accessibilityLabel="Hannah's login"
        />
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Roxanne"
          color="#f46d41"
          accessibilityLabel="Roxanne's login"
        />
      </View>
    );
  }

  render() {
    return <View>{this.renderContent()}</View>;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
