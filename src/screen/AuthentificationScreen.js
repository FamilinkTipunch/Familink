import React, { Component } from 'react';
import { Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Popup from 'react-native-popup';
import { transparent, styles } from './styles/styles';
import LoadingScreen from './LoadingScreen';
import { getProfile, userSignIn } from '../services/WebService';

import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { emailRegex, phoneRegex, passwordRegex } from '../Tools/Regex';

const title = 'Quel statut vous correspond le mieux ?';

export const AUTH_SCREEN_NAME = 'AUTH_SCREEN';

export default class AuthentificationScreen extends Component {
    static navigationOptions = {
      title: 'Enregistrement',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToLogin = this.navigateToLogin.bind(this);

      this.state = {
        firstName: '',
        firstNameBool: true,
        lastName: '',
        lastNameBool: true,
        email: '',
        emailBool: true,
        phone: '',
        phoneBool: true,
        password: '',
        passwordBool: true,
        passwordRetype: '',
        passwordRetypeBool: true,
        allInputCorrect: 0,
        profile: '',
        profileList: null,
        firstpin: '',
        validate: false,
        selected: 0,
      };
      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this);
      this.signin = this.signin.bind(this);
    }
    async componentWillMount() {
      this.setState({
        profileList: await getProfile(),
      });
    }

    onAlert() {
      this.popup.alert('Certains champs sont incorrects\n ou vides. Veillez à remplir les\n champs en rouge afin de\n poursuivre votre enregistrement');
    }

    showActionSheet() {
      this.ActionSheet.show();
    }

    handlePress(i) {
      this.setState({
        selected: i,
      });
    }

    navigateToLogin() {
      this.navigate(LOGIN_SCREEN_NAME);
    }

    async signin() {
      const returnValue = await userSignIn(this.state.phone,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.profileList[this.state.selected]);
      if (returnValue === 1) {
        this.navigateToLogin();
      }
    }

    validator = () => {
      if (emailRegex.test(this.state.email) !== true) {
        this.setState({ emailBool: false });
      } else {
        this.setState({ emailBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.firstName === '') {
        this.setState({ firstNameBool: false });
      } else {
        this.setState({ firstNameBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.lastName === '') {
        this.setState({ lastNameBool: false });
      } else {
        this.setState({ lastNameBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (phoneRegex.test(this.state.phone) !== true) {
        this.setState({ phoneBool: false });
      } else {
        this.setState({ phoneBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (passwordRegex.test(this.state.password) !== true) {
        this.setState({ passwordBool: false });
        this.setState({ passwordRetypeBool: false });
      } else {
        this.setState({ passwordBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.password !== this.state.passwordRetype || this.state.password === '') {
        this.setState({ passwordRetypeBool: false });
      } else {
        this.setState({ passwordRetypeBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.allInputCorrect === 6) {
        this.signin();
      } else {
        this.onAlert();
      }
      this.setState({ allInputCorrect: 0 });
    }

    render() {
      if (!this.state.profileList) {
        return <LoadingScreen />;
      }
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={true} style={styles.signin}>
            <TextInput
              style={
                this.state.firstNameBool
                  ? [styles.input, styles.inputTop, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputTop, styles.classic]}
              placeholder={'Prénom'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName, firstNameBool: true })}
            />
            <TextInput
              style={
                this.state.lastNameBool
                  ? [styles.input, styles.inputMiddle, styles.blue]
                  : [styles.input, styles.inputFalse, styles.classic]}
              placeholder={'Nom'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName, lastNameBool: true })}
            />
            <TextInput
              style={
                this.state.emailBool
                  ? [styles.input, styles.inputMiddle, styles.blue]
                  : [styles.input, styles.inputFalse, styles.classic]}
              keyboardType={'email-address'}
              placeholder={'eMail'}
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.email}
              onChangeText={email => this.setState({ email, emailBool: true })}
            />
            <TextInput
              style={
                this.state.phoneBool
                  ? [styles.input, styles.inputBottom, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputBottom, styles.classic]}
              keyboardType={'phone-pad'}
              placeholder={'Tel'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              maxLength={10}
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone, phoneBool: true })}
            />
            <TextInput
              style={
                this.state.passwordBool
                  ? [styles.input, styles.inputTop, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputTop, styles.classic]}
              keyboardType={'numeric'}
              secureTextEntry={true}
              placeholder={'Code Pin'}
              underlineColorAndroid={transparent}
              maxLength={4}
              value={this.state.password}
              onChangeText={password => this.setState({ password, passwordBool: true })}
            />
            <TextInput
              style={
                this.state.passwordRetypeBool
                  ? [styles.input, styles.inputBottom, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputBottom, styles.classic]}
              keyboardType={'numeric'}
              secureTextEntry={true}
              placeholder={'Confirmer code'}
              underlineColorAndroid={transparent}
              maxLength={4}
              value={this.state.passwordRetype}
              onChangeText={
                passwordRetype => this.setState({
                  passwordRetype, passwordRetypeBool: true,
                })}
            />
            <View style={styles.wrapper}>
              <TouchableHighlight onPress={this.showActionSheet} underlayColor={transparent}>
                <View style={styles.actionSheet}>
                  <Text style={styles.sheetText}>
                    {this.state.profileList[this.state.selected]}
                  </Text>
                </View>
              </TouchableHighlight>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={this.state.profileList}
                onPress={this.handlePress}
              />
            </View>
            <TouchableHighlight
              onPress={this.validator}
              underlayColor={transparent}
            >
              <View style={styles.confirmationButton}>
                <Text style={styles.validateText}>
                Valider
                </Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
          <Popup ref={popup => (this.popup = popup)} />
        </View>
      );
    }
}
