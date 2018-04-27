import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, WebView, FormLabel, FormInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';


class SignIn extends React.Component {

  onSubmit(event){
    event.prevenDefault()
    alert('woot!')
  }

  render() {
    let pic = {
      uri: 'http://etcalendar.its.txstate.edu/image/6722/take%20a%20study%20break.jpg'
    }
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={pic} style={{ width: 262, height: 150 }} />
        </View>
        <View style={styles.buttons}>
          {/*<FormLabel>email</FormLabel>
          <FormInput/>
          <FormLabel>password</FormLabel>
          <FormInput/>
          <Button 
            onPress={() => { this.handleSubmit}}
            title="Log In"
          />*/}
          <Button
            onPress={() => {
              this.props.navigation.navigate('Page', {
                email: 'laurel.bear@gmail.com'
              })}}
            title="Laurel"
            color="#f4af41"
            accessibilityLabel="Laurel's login"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Page', {
              email: 'hgodlove@gmail.com'
            })}
            title="Hannah"
            color="#f49741"
            accessibilityLabel="Hannah's login"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Page', {
              email: 'roxannewinston@gmail.com'
            })}
            title="Roxanne"
            color="#f46d41"
            accessibilityLabel="Roxanne's login"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center'
  },
  logo: {
    paddingTop: 40,
    paddingBottom: 60
  },
  buttons: {},
  kickedOut: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});


class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      site: '',
      urlArr: [],
    }
  }
  
  componentDidMount() {
    const { params } = this.props.navigation.state
    axios.get('http://172.16.26.79:8080/api/users')
    .then((res) => {
      const users = res.data
      const [ user ] = users.filter((user) => user.email === params.email)
      let urlArr = user.categories
      let site = urlArr[Math.floor(Math.random() * Math.floor(urlArr.length - 1))];
      this.setState({ urlArr, site })
    })
    .catch((error) => console.log(error))
  }

  nextSite () {
    urlArr = this.state.urlArr
    site = urlArr[Math.floor(Math.random() * Math.floor(urlArr.length-1))]
    this.setState({ site })
  }

  render() {
    return (
      <View style={styles.container}>
          {/*<Image source={this.state.pic} style={{ width: 200, height: 400 }} />*/}
          <WebView source={{ uri: this.state.site }} style={{ marginTop: 20, width: 300, height: 300 }} />
          <Button onPress={this.nextSite.bind(this)} title="Next"/>
      </View>
    )
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: SignIn
    },
    Page: {
      screen: UserPage
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      rendering: true
    }
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ rendering: false })
    // }, 10000)
  }
  
  render() {
    return (
      this.state.rendering
      ? <RootStack />
      : <View style={styles.kickedOut}>
          <Text>Time to get back to work!</Text>
        </View>
    )
  }
}



