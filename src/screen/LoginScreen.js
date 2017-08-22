import React, { Component } from 'react';
import { View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Content, ListItem, CheckBox, Body, Text } from 'native-base';
import WebService from '../services/WebService';


import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

const styles = require('./styles/styles');

export const LOGIN_SCREEN_NAME = 'LOGIN_SCREEN';

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: 'Login',
      headerLeft: null,
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigatetoForgottenPassword = this.navigateToHome.bind(this);
      this.navigateToLogout = this.navigateToLogout.bind(this);
      this.navigateToPhoneBookDetail = this.navigateToPhoneBookDetail.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.login = this.login.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        numeroTel: '',
        password: '',
        isChecked: false,
        isLogin: '',
      };
    }

    navigateToForgottenPassword() {
      this.navigate(FORGOTTENPASSWORD_SCREEN_NAME);
    }

    navigateToHome() {
      this.navigate(HOME_SCREEN_NAME);
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
    rememberMeOnChange() {
      this.setState({ isChecked: !this.state.isChecked });
    }

    async login() {
      this.setState({
        isLogin: await WebService.canLogin(this.state.numeroTel, this.state.password),
      });
      if (this.state.isLogin === 'User not found' || this.state.isLogin === 'Password is not valid') {
        console.log(this.state.isLogin);
      } else {
        this.navigateToHome();
      }
    }

    render() {
      return (
        <ScrollView scrollsToTop={false} style={styles.signin}>
          <TextInput
            style={[styles.input, styles.inputBottom, styles.tel]}
            keyboardType={'phone-pad'}
            placeholder={'Tel'}
            maxLength={10}
            onChangeText={numeroTel => this.setState({ numeroTel })}
          />
          <TextInput
            style={[styles.input, styles.inputStandAlone, styles.password]}
            keyboardType={'numeric'}
            secureTextEntry={true}
            placeholder={'Code Pin'}
            maxLength={4}
            onChangeText={password => this.setState({ password })}
          />
          <Content>
            <ListItem style={styles.checkboxLogin}>
              <CheckBox checked={this.state.isChecked} onPress={() => this.rememberMeOnChange()} />
              <Body>
                <Text>Remember me</Text>
              </Body>
            </ListItem>
          </Content>
          <TouchableHighlight onPress={this.login}>
            <View style={styles.confirmationButton}>
              <Text style={styles.validateText}>Log In</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.containerCreateAccount}>
            <TouchableHighlight onPress={this.navigateToAuthentification}>
              <Text style={styles.inputLoginCreateAccount}>Create Account</Text>
            </TouchableHighlight>
            <Text style={styles.inputLoginCreateAccount}>|</Text>
            <TouchableHighlight>
              <Text style={styles.inputLoginCreateAccount}>Forgot password?</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      );
    }
}
