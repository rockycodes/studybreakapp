import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback, WebView, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import { KeyAwareScrollView, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//fullstack IP - http://172.16.26.79:8080
//hannah IP - http://192.168.1.156:8080

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
    axios
      .post('http://192.168.1.8:8080/auth/login', { email, password })
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
      .post('http://192.168.1.8:8080/auth/signup', { email, password })
      .then(res => {
        const user = res.data;
        this.setState({ user });
        this.props.navigation.navigate('CategoryPage', {
          user: this.state.user
        });
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
      url: '',
      catArr: [],
    }
  }
  
  componentDidMount() {
    const { params } = this.props.navigation.state
    const user = params.user
    let catArr = user.categories
    this.setState({ user, catArr })
    let category = catArr[Math.floor(Math.random() * catArr.length)];
    console.log("category is..", category)
    let index = Math.floor(Math.random()*100)
    console.log("index is..", index)
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCpNig0xgMK0kBUvS063nd8EPvc4NTEJ9o&cx=011206717166158345436:d6qgvrrgtnq&q=${category}&num=1&start=${index}`)
      .then(res => res.json())
      .then(site => {
        let url = site.items[0].link
        console.log("url is...", url)
        this.setState({ url });
      })
      .catch((err) => console.log(err))
  }

  nextSite () {
    catArr = this.state.catArr
    let category = catArr[Math.floor(Math.random() * catArr.length)];
    console.log('category is..', category);
    let index = Math.floor(Math.random() * 100);
    console.log('index is..', index);
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCpNig0xgMK0kBUvS063nd8EPvc4NTEJ9o&cx=011206717166158345436:d6qgvrrgtnq&q=${category}&num=1&start=${index}`)
      .then(res => res.json())
      .then(site => {
        let url = site.items[0].link
        console.log('url is...', url)
        this.setState({ url })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
          <WebView source={{ uri: this.state.url }} style={{ marginTop: 20, width: 300, height: 300 }} />
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
      catOne: '',
      catTwo: '',
      catThree: '',
      user: {}
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const user = params.user;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault()
    const catsToAdd = []
    if (this.state.catOne !== '') catsToAdd.push(this.state.catOne);
    if (this.state.catTwo !== '') catsToAdd.push(this.state.catTwo);
    if (this.state.catThree !== '') catsToAdd.push(this.state.catThree);
    const userId = this.state.user.id
    console.log('cats are ...', catsToAdd)
    axios
      .post(`http://192.168.1.8:8080/api/users/${userId}/categories`, { catsToAdd })
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
      <KeyboardAwareScrollView 
        style={{backgroundColor: 'bisque'}} 
        resetScrollToCoords={{x:0, y:0}} 
        contentContainerStyle={styles.container} 
        scrollEnabled={false}>
        <View style={styles.textHeader}>
          <Text style={{color: 'white', fontSize: 20}}>add some things you like!</Text>
        </View>
        <View style={styles.form}>
          <FormLabel>1.</FormLabel>
          <FormInput onChangeText={(value) => this.setState({catOne: value.toLowerCase()})}/>
          <FormLabel>2.</FormLabel>
          <FormInput onChangeText={(value) => this.setState({catTwo: value.toLowerCase()})}/>
          <FormLabel>3.</FormLabel>
          <FormInput onChangeText={(value) => this.setState({catThree: value.toLowerCase()})}/>
          <View style={styles.catSubmitBtn}>
            <Button
              onPress={this.handleSubmit.bind(this)}
              title="onwards >"
              color="darkorange"
              accessibilityLabel='submit'
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    alignItems: 'center',
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
    justifyContent: 'space-around'
  },
  textHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'darkorange',
    width: 300
  },
  catSubmitBtn: {
    paddingTop: 50
  }
});
