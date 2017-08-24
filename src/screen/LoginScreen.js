import React, { Component } from 'react';
import Toast from 'react-native-simple-toast';
import { View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Content, ListItem, CheckBox, Body, Text } from 'native-base';
import Popup from 'react-native-popup';
import { transparent, styles } from './styles/styles';
import WebService from '../services/WebService';
import CheckReseau from '../services/CheckReseau';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

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
        numTel: '',
        numTelBool: true,
        password: '',
        passwordBool: true,
        isChecked: false,
        isLogin: '',
      };
    }
    componentWillMount() {
      CheckReseau.checkConnectivity();
    }

    onAlert() {
      this.popup.alert('Votre nom d\'utilisateur ou\n mot de passe sont incorrects');
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
        isLogin: await WebService.canLogin(this.state.numTel, this.state.password),
      });
      if (this.state.isLogin.message !== 'Network request failed') { // si la connexion wifi est active
        if (this.state.isLogin.message === 'User not found' || this.state.isLogin.message === 'Password is not valid') {
          this.validator();
        } else {
          Toast.show('Vous etes bien connecté');
          this.navigateToHome();
        }
      }
    }

    validator = () => {
      if (this.state.isLogin.message === 'User not found') {
        this.setState({ numTelBool: false });
        this.setState({ passwordBool: false });
      } else if (this.state.isLogin.message !== 'User not found' && this.state.isLogin.message === 'Password is not valid') {
        this.setState({ passwordBool: false });
      }
      this.onAlert();
    }

    render() {
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={false} style={styles.signin}>
            <TextInput
              style={
                this.state.numTelBool
                  ? [styles.input, styles.inputTop, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputTop, styles.classic]}
              keyboardType={'phone-pad'}
              placeholder={'Tel'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              maxLength={10}
              onChangeText={numTel => this.setState({ numTel, numTelBool: true })}
            />
            <TextInput
              style={
                this.state.passwordBool
                  ? [styles.input, styles.inputBottom, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputBottom, styles.classic]}
              keyboardType={'numeric'}
              secureTextEntry={true}
              placeholder={'Code Pin'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              maxLength={4}
              onChangeText={password => this.setState({ password, passwordBool: true })}
            />
            <Content>
              <ListItem style={styles.checkboxLogin}>
                <CheckBox
                  checked={this.state.isChecked}
                  onPress={() => this.rememberMeOnChange()}
                />
                <Body>
                  <Text style={styles.inputLoginCreateAccount}>Se souvenir de moi</Text>
                </Body>
              </ListItem>
            </Content>
            <TouchableHighlight onPress={this.login} underlayColor={transparent}>
              <View style={styles.confirmationButton}>
                <Text style={styles.validateText}>Connexion</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.containerCreateAccount}>
              <TouchableHighlight
                onPress={this.navigateToAuthentification}
                underlayColor={transparent}
              >
                <Text style={styles.inputLoginCreateAccount}>Enregistrement</Text>
              </TouchableHighlight>
              <Text style={styles.inputLoginCreateAccount} underlayColor={transparent}>|</Text>
              <TouchableHighlight>
                <Text style={styles.inputLoginCreateAccount}>Code Pin oublié ?</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
          <Popup /*eslint-disable*/ ref={popup => (this.popup = popup)} /*eslint-enable*//>
        </View>
      );
    }
}
