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
    const email = this.state.email
    const password = this.state.password
    axios
      .post('http://192.168.1.156:8080/auth/signup', { email, password })
      .then(res => {
        const user = res.data;
        this.setState({ user });
        this.props.navigation.navigate('CategoryPage', { user: this.state.user });
      })
      .catch(error => console.log(error));
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
          <WebView source={{ uri: this.state.site }} style={{ marginTop: 20, width: 300, height: 300 }} />
          <Button onPress={this.nextSite.bind(this)} title="Next"/>
      </View>
    )
  }
}


//ADD CATEGORIES PAGEEEEEEEE

class CategorySelectPage extends React.Component {
  constructor() {
    super();
    this.state = {
      urlsToAdd: [],
      user: {}
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const user = params.user;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    const urlsToAdd = this.state.urlsToAdd;
    const userId = this.state.user.id;
    axios
      .post(`http://192.168.1.156:8080/api/users/${userId}/categories`, {
        urlsToAdd
      })
      .then(res => {
        const user = res.data;
        this.setState({ user });
        console.log(user)
        this.props.navigation.navigate('Page', { user: this.state.user });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.state.urlsToAdd.push(
            'https://www.vox.com/videos/2017/5/23/15362626/how-tap-dancing-was-made-in-america'
          )}
          title="Tap Dancing"
          color="darkgrey"
          accessibilityLabel="tap dancing"
        />
        <Button
          onPress={() => this.state.urlsToAdd.push(
            'http://cheezburger.com/1633029/33-funny-cat-memes-that-never-fail-to-make-us-lol'
          )}
          title="Cats"
          color="darkgrey"
          accessibilityLabel="cats"
        />
        <Button
          onPress={() => this.state.urlsToAdd.push(
            'https://www.motherjones.com/media/2014/06/computer-science-programming-code-diversity-sexism-education/'
          )}
          title="Coding"
          color="darkgrey"
          accessibilityLabel="coding"
        />
        <Button
          onPress={this.handleSubmit.bind(this)}
          title="Submit"
          color="darkgrey"
          accessibilityLabel="submit"
        />
      </View>
    );
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
    CategoryPage: {
      screen: CategorySelectPage
    }
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
