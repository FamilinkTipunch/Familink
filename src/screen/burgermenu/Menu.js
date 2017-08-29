import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { styles } from '../styles/styles';
import { PHONEBOOKLIST_SCREEN_NAME } from '../PhoneBookListScreen';
import { HOME_SCREEN_NAME } from '../HomeScreen';
import { LOGIN_SCREEN_NAME } from '../LoginScreen';
import Storage from '../../services/Storage';

const uri = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/US_Navy_100915-N-4790M-040_Lanier_Phillips%2C_left%2C_Bill_Cosby_and_Ed_LeBaron_pose_for_a_picture_before_receiving_the_Lone_Sailor_Award_at_the_Nation_%28cropped_to_Cosby%29.jpg';

export default class Menu extends Component {
  static navigationOptions = {
    title: 'Burger',
    headerLeft: null,
  };

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.navigateToHome = this.navigateToHome.bind(this);
    this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
    this.navigateToLogin = this.navigateToLogin.bind(this);
  }

  navigateToHome() {
    this.navigate(HOME_SCREEN_NAME);
  }

  navigateToPhoneBookList() {
    this.navigate(PHONEBOOKLIST_SCREEN_NAME);
  }
  navigateToLogin() {
    this.navigate(LOGIN_SCREEN_NAME);
  }

  signOut() {
    Storage.setData('@Token:key', '');
    this.navigateToLogin();
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri }}
          />
          <Text style={styles.name}>Bill Cosby</Text>
        </View>
        <Text
          onPress={this.navigateToHome}
          style={styles.item}
        >
          Accueil
        </Text>
        <Text
          onPress={this.navigateToPhoneBookList}
          style={styles.item}
        >
          Contacts
        </Text>
        <Text
          onPress={() => this.signOut()}
          style={styles.item}
        >
          Déconnexion
        </Text>
      </ScrollView>
    );
  }
}
