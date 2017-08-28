import React, { Component } from 'react';
import Toast from 'react-native-simple-toast';
import { View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Content, ListItem, CheckBox, Body, Text } from 'native-base';
import Popup from 'react-native-popup';
import { transparent, styles } from './styles/styles';
import WebService from '../services/WebService';
import CheckReseau from '../services/CheckReseau';
import Storage from '../services/Storage';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';

export const LOGIN_SCREEN_NAME = 'LOGIN_SCREEN';

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: 'Login',
      headerLeft: null,
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToHome = this.navigateToHome.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.navigateToForgottenPassword = this.navigateToForgottenPassword.bind(this);
      this.login = this.login.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        numTel: '',
        numTelBool: true,
        password: '',
        passwordBool: true,
        isChecked: true,
        isLogin: '',
      };
    }
    componentWillMount() {
      this.setState({
        isChecked: Storage.getData('@RememberMe:key'),
      });
      if (this.state.isChecked === true) {
        Storage.getData('@Phone:key')
          .then((value) => {
            this.setState({
              numTel: value,
              isChecked: false,
            });
          });
      } else {
        this.setState({
          isChecked: false,
        });
      }
    }

    componentDidMount() {
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

    navigateToAuthentification() {
      this.navigate(AUTH_SCREEN_NAME);
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
          if (!this.state.isChecked === true) {
            Storage.setData('@Phone:key', this.state.numTel);
            Storage.setData('@RememberMe:key', String(!this.state.isChecked));
          } else {
            Storage.setData('@Phone:key', '');
            Storage.setData('@RememberMe:key', String(!this.state.isChecked));
          }
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
              value={this.state.numTel}
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
                  checked={!this.state.isChecked}
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
              <TouchableHighlight
                onPress={this.navigateToForgottenPassword}
                underlayColor={transparent}
              >
                <Text style={styles.inputLoginCreateAccount}>Code Pin oublié ?</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
          <Popup /*eslint-disable*/ ref={popup => (this.popup = popup)} /*eslint-enable*//>
        </View>
      );
    }
}
