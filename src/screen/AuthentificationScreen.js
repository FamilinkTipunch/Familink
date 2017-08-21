import React, { Component } from 'react';
import { Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';

import { HOME_SCREEN_NAME } from './HomeScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';
import { transparent } from './styles/styles';

const styles = require('./styles/styles');

const CANCEL_INDEX = 0;
const options = ['Annuler', 'Senior', 'Famille', 'Professionnel'];
const title = 'Quel statut vous correspond le mieux ?';

export const AUTH_SCREEN_NAME = 'AUTH_SCREEN';

export default class AuthentificationScreen extends Component {
    static navigationOptions = {
      title: 'Enregistrement',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToHome = this.navigateToHome.bind(this);
      this.navigateToLogin = this.navigateToLogin.bind(this);
      this.navigateToPhoneBookDetail = this.navigateToPhoneBookDetail.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToForgottenPassword = this.navigateToForgottenPassword.bind(this);
      this.navigateToLogout = this.navigateToLogout.bind(this);
      this.state = { firstpin: '' };
      this.state = { validate: false };
      this.state = {
        selected: '',
      };
      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this);
    }

    onChangeDo(firstpin) {
      this.setState({ firstpin });
      if (firstpin === '0000') {
        return this.setState({ validate: true });
      }
      return this.setState({ validate: false });
    }

    showActionSheet() {
      this.ActionSheet.show();
    }

    handlePress(i) {
      console.log(i);
      if (this.state.selected !== 0) {
        this.setState({
          selected: i,
        });
      }
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

    navigateToForgottenPassword() {
      this.navigate(FORGOTTENPASSWORD_SCREEN_NAME);
    }

    navigateToLogout() {
      this.navigate(LOGOUT_SCREEN_NAME);
    }

    render() {
      return (
        <ScrollView scrollsToTop={false} style={styles.signin}>
          <TextInput
            style={[styles.input, styles.inputTop, styles.classic]}
            placeholder={'Nom'}
            underlineColorAndroid={transparent}
            maxLength={15}
          />
          <TextInput
            style={[styles.input, styles.inputMiddle, styles.classic]}
            placeholder={'Prenom'}
            underlineColorAndroid={transparent}
            maxLength={15}
          />
          <TextInput
            style={[styles.input, styles.inputMiddle, styles.tel]}
            keyboardType={'email-address'}
            placeholder={'eMail'}
            underlineColorAndroid={transparent}
            maxLength={30}
          />
          <TextInput
            style={[styles.input, styles.inputBottom, styles.tel]}
            keyboardType={'phone-pad'}
            placeholder={'Tel'}
            underlineColorAndroid={transparent}
            maxLength={10}
          />
          <TextInput
            style={[styles.input, styles.inputTop, styles.password]}
            keyboardType={'numeric'}
            secureTextEntry={true}
            placeholder={'Code Pin'}
            underlineColorAndroid={transparent}
            maxLength={4}
          />
          <TextInput
            style={[styles.input, styles.inputBottom, styles.password]}
            keyboardType={'numeric'}
            secureTextEntry={true}
            placeholder={'Confirmer code'}
            underlineColorAndroid={transparent}
            maxLength={4}
          />
          <View style={styles.wrapper}>
            <TouchableHighlight onPress={this.showActionSheet}>
              <View style={styles.actionSheet}>
                <Text>
                  {options[this.state.selected]}
                </Text>
              </View>
            </TouchableHighlight>
            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={title}
              options={options}
              cancelButtonIndex={CANCEL_INDEX}
              onPress={this.handlePress}
            />
          </View>
          <TouchableHighlight onPress={this.navigateToHome}>
            <View style={styles.confirmationButton}>
              <Text style={styles.validateText}>
                Valider
              </Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      );
    }
}
