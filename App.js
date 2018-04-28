import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, WebView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

//fullstack IP - http://172.16.26.79:8080

class SignIn extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      user: {}
    }
  }
  
  handleLogin(evt) {
    evt.preventDefault();
    const email = this.state.email
    const password = this.state.password
    axios.post('http://192.168.1.156:8080/auth/login', { email, password })
    .then((res) => {
      const user = res.data
      this.setState({ user })
      this.props.navigation.navigate('Page', {
        user: this.state.user
      });
    })
    .catch(error => console.log(error));

  }

  handleSignup(event) {
    event.preventDefault();
    alert('signup!');
  }

  render() {
    let pic = {
      uri:
        'http://etcalendar.its.txstate.edu/image/6722/take%20a%20study%20break.jpg'
    };
    return (
      <KeyboardAvoidingView style={styles.container} behavior='position' enabled>
        <View style={styles.logo}>
          <Image source={pic} style={{ width: 262, height: 150 }} />
        </View>
        <View style={styles.form}>
          <FormLabel>email</FormLabel>
          <FormInput onChangeText={(value) => this.setState({email: value.toLowerCase()})}/>
          <FormLabel>password</FormLabel>
          <FormInput onChangeText={(value) => this.setState({password: value.toLowerCase()})}/>
          <View style={styles.loginSignupBtns}>
            <Button
              onPress={this.handleLogin.bind(this)}
              title="log in"
              color="darkgrey"
              accessibilityLabel='login'
            />
            <Button
              onPress={this.handleSignup.bind(this)}
              title="sign up"
              color="darkgrey"
              accessibilityLabel='signup'
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

//USER PAGEEEEEEEEEEEEEE

class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      site: '',
      urlArr: [],
    }
  }
  
  componentDidMount() {
    const { params } = this.props.navigation.state
    const user = params.user
    let urlArr = user.categories
    let site = urlArr[Math.floor(Math.random() * Math.floor(urlArr.length))];
    this.setState({user, site, urlArr})
  }

  nextSite () {
    urlArr = this.state.urlArr
    site = urlArr[Math.floor(Math.random() * Math.floor(urlArr.length))]
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
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
    justifyContent: 'center'
  },
  form: {
    width: 300
  },
  loginSignupBtns: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});
