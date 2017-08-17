import React, { Component } from 'react';

import {
  Button,
  View,
  Text,
} from 'react-native';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

export const HOME_SCREEN_NAME = 'HOME_SCREEN';

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToForgottenPassword = this.navigateToForgottenPassword.bind(this);
      this.navigateToLogin = this.navigateToLogin.bind(this);
      this.navigateToPhoneBookDetail = this.navigateToPhoneBookDetail.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.navigateToLogout = this.navigateToLogout.bind(this);
    }

    navigateToForgottenPassword() {
      this.navigate(FORGOTTENPASSWORD_SCREEN_NAME);
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
          <Text>Page Accueil</Text>
          <Button
            onPress={this.navigateToLogin}
            title="LOGIN"
          />
          <Button
            onPress={this.navigateToForgottenPassword}
            title="RECOVER PASSWORD"
          />
          <Button
            onPress={this.navigateToPhoneBookDetail}
            title="PhoneBookDetail"
          />
          <Button
            onPress={this.navigateToLogout}
            title="LOGOUT"
          />
          <Button
            onPress={this.navigateToAuthentification}
            title="AUTH"
          />
          <Button
            onPress={this.navigateToPhoneBookList}
            title="PhoneBookList"
          />
        </View>);
    }
}

