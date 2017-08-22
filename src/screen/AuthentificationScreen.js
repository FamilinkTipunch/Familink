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
import WebService from '../services/WebService';
import LoadingScreen from './LoadingScreen';

const styles = require('./styles/styles');

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

      this.state = {
        phone: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        profile: '',
        profileList: null,
        firstpin: '',
        validate: false,
        selected: '',
      };
      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this);
      this.signin = this.signin.bind(this);
    }
    async componentWillMount() {
      this.setState({
        profileList: await WebService.getProfile(),
      });
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
      this.setState({
        selected: i,
      });
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

    async signin() {
      console.log('debut');
      await WebService.userSignIn(this.state.phone,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.profileList[this.state.selected]);
      this.navigateToLogin();
      console.log('travail terminé');
    }

    render() {
      if (!this.state.profileList) {
        return <LoadingScreen />;
      }
      return (
        <ScrollView scrollsToTop={false} style={styles.signin}>
          <TextInput
            style={[styles.input, styles.inputTop, styles.classic]}
            placeholder={'Nom'}
            underlineColorAndroid={transparent}
            maxLength={15}
            onChangeText={lastName => this.setState({ lastName })}
          />
          <TextInput
            style={[styles.input, styles.inputMiddle, styles.classic]}
            placeholder={'Prenom'}
            underlineColorAndroid={transparent}
            maxLength={15}
            onChangeText={firstName => this.setState({ firstName })}
          />
          <TextInput
            style={[styles.input, styles.inputMiddle, styles.tel]}
            keyboardType={'email-address'}
            placeholder={'eMail'}
            underlineColorAndroid={transparent}
            maxLength={30}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={[styles.input, styles.inputBottom, styles.tel]}
            keyboardType={'phone-pad'}
            placeholder={'Tel'}
            underlineColorAndroid={transparent}
            maxLength={10}
            onChangeText={phone => this.setState({ phone })}
          />
          <TextInput
            style={[styles.input, styles.inputTop, styles.password]}
            keyboardType={'numeric'}
            secureTextEntry={true}
            placeholder={'Code Pin'}
            underlineColorAndroid={transparent}
            maxLength={4}
            onChangeText={password => this.setState({ password })}
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
            onPress={this.signin}
            underlayColor={transparent}
          >
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
