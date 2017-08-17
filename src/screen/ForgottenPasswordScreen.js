import React, { Component } from 'react';

import {
  Text,
  View,
} from 'react-native';

import { HOME_SCREEN_NAME } from './HomeScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

export const FORGOTTENPASSWORD_SCREEN_NAME = 'FORGOTTENPASSWORD_SCREEN';

export default class ForgottenPasswordScreen extends Component {
    static navigationOptions = {
      title: 'ForgottenPassword',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToHome = this.navigateToHome.bind(this);
      this.navigateToLogin = this.navigateToLogin.bind(this);
      this.navigateToPhoneBookDetail = this.navigateToPhoneBookDetail.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.navigateToLogout = this.navigateToLogout.bind(this);
    }

    navigateToHome() {
      this.navigate(HOME_SCREEN_NAME);
    }

    navigateToLogin() {
      this.navigate(LOGIN_SCREEN_NAME);
    }

    navigateToPhoneBookDetail() {
      this.navigate(PHONEBOOKDETAIL_SCREEN_NAME);
    }

    navigateToPhoneBookList() {
      this.navigate(PHONEBOOKLIST_SCREEN_NAME);
    }

    navigateToAuthentification() {
      this.navigate(AUTH_SCREEN_NAME);
    }

    navigateToLogout() {
      this.navigate(LOGOUT_SCREEN_NAME);
    }

    render() {
      return (
        <View>
          <Text>Page ForgottenPassword</Text>
        </View>);
    }
}
