import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import Popup from 'react-native-popup';
import Toast from 'react-native-simple-toast';
import { transparent, styles } from './styles/styles';
import { forgotPassword } from '../services/WebService';
import { LOGIN_SCREEN_NAME } from './LoginScreen';

export const FORGOTTENPASSWORD_SCREEN_NAME = 'FORGOTTENPASSWORD_SCREEN';

export default class ForgottenPasswordScreen extends Component {
    static navigationOptions = {
      title: 'Mot de passe oublié',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToLogin = this.navigateToLogin.bind(this);
      this.state = {
        phone: '',
        phoneBool: true,
      };
    }
    onAlert() {
      this.popup.alert('Champs incorrect ou vide.\n Vérifier le numéro de téléphone saisi.');
    }
    navigateToLogin() {
      this.navigate(LOGIN_SCREEN_NAME);
    }

    async sendForgotPassword() {
      const status = await forgotPassword(this.state.phone);
      if (status === 1) {
        Toast.show('Un SMS vous a été envoyé');
        this.navigateToLogin();
      } else if (status !== null) {
        Toast.show(`Une erreur est survenue lors de la saisi du numéro avec le code erreur: ${status}`);
      }
    }
    validator = () => {
      if (this.state.phone.length < 10) {
        this.setState({ phoneBool: false });
        this.onAlert();
      } else {
        this.setState({ phoneBool: true });
        this.sendForgotPassword();
      }
    }
    render() {
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={false} style={styles.signin}>
            <Text style={styles.textForgotPassword}>Vous avez oublié votre mot de passe? { '\n' } Aucun problème,
              rentrer ci-dessous votre numéro de téléphone et vous
              recevrez un SMS pour le réinitialiser.</Text>
            <TextInput
              style={
                this.state.phoneBool
                  ? [styles.input, styles.inputStandAlone, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputStandAlone, styles.classic]}
              keyboardType={'phone-pad'}
              placeholder={'Tel'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              maxLength={10}
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone, phoneBool: true })}
            />
            <TouchableHighlight onPress={this.validator} underlayColor={transparent}>
              <View style={styles.confirmationButton}>
                <Text style={styles.validateText}>Envoyer</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
          <Popup ref={popup => (this.popup = popup)} />
        </View>
      );
    }
}
