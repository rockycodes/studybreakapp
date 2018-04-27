import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableWithoutFeedback } from 'react-native';
import { StackNavigator } from 'react-navigation';


class SignIn extends React.Component {
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
          <Button
            onPress={() => {
              this.props.navigation.navigate('Page')}}
            title="Laurel"
            color="#f4af41"
            accessibilityLabel="Laurel's login"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Page')}
            title="Hannah"
            color="#f49741"
            accessibilityLabel="Hannah's login"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Page')}
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
  buttons: {}
});


class UserPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pic: {
        uri: 'https://www.listenherereviews.com/wp-content/uploads/2014/06/JanelleMonae_Covergirl.jpeg'
      },
      imgArr: [
        'https://pixel.nymag.com/imgs/fashion/daily/2018/04/26/26-Janelle-Monae.w710.h473.jpg',
        'https://media.gq.com/photos/5877c07a2aaff8d26115b6d6/3:2/w_880/0217-GQ-FEJM02-01-Janelle-Monae-02.jpg',
        'https://www.listenherereviews.com/wp-content/uploads/2014/06/JanelleMonae_Covergirl.jpeg',
        'https://images-na.ssl-images-amazon.com/images/I/A1-YMqg-VtL.jpg',
        'https://img.wennermedia.com/article-leads-immersive/janelle-monae-cover-story-rolling-stone-2018--40f2968e-20e6-4009-88a1-c1d4c1c8371e.jpg',
        'https://media.gq.com/photos/5877c21f57b572032fe7f304/master/w_800/0217-GQ-FEJM01-01-Janelle-Monae-03.jpg',
        'https://media.wmagazine.com/photos/585993c97bff064164722dd9/4:3/w_1536/0217.who.opener.lo;16_View.jpg',
        'https://www.billboard.com/files/media/bb27-beat-janelle-monae-3fj-2016-billboard-1548.jpg',
        'http://img.wennermedia.com/social/janelle-monae-e57247ba-d253-4786-802e-10ff41a9ef32.jpg',
        'https://www.grammy.com/sites/com/files/janellemonae-spotlight-645713968.png'
      ]
    }
  }
  
  pickPic () {
    const imgArr = this.state.imgArr
    let newPic = imgArr[Math.floor(Math.random() * Math.floor(imgArr.length-1))]
    this.setState({ pic: {uri: newPic }})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress = {this.pickPic.bind(this)}>
          <Image source={this.state.pic} style={{ width: 200, height: 400 }} />
        </TouchableWithoutFeedback>
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
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}



