import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import { Content, ListItem, CheckBox, Body, Text } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/burgermenu';


import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

const image = require('../assets/menu.png');
const styles = require('./styles/styles');

export const LOGIN_SCREEN_NAME = 'LOGIN_SCREEN';

export default class LoginScreen extends Component {
    static navigationOptions = {
      title: 'Login',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigatetoForgottenPassword = this.navigateToHome.bind(this);
      this.navigateToLogout = this.navigateToLogout.bind(this);
      this.navigateToPhoneBookDetail = this.navigateToPhoneBookDetail.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        value: {
          numeroTel: '',
          password: '',
        },
        checked: false,
      };
    }
    componentWillUnmount() {
      this.setState({
        value: {
          numeroTel: '',
          password: null,
        },
      });
    }
    onChange = (value) => {
      this.setState({
        value,
      });
    }
    onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
        selectedItem: item,
      },
      );

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
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
    rememberMeonChange() {
      this.setState({ checked: true });
    }

    render() {
     // const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
      return (
        <ScrollView scrollsToTop={false} style={styles.signin}>
          <TextInput
            style={[styles.input, styles.inputBottom, styles.tel]}
            keyboardType={'phone-pad'}
            placeholder={'Tel'}
            maxLength={10}
            value={this.state.value.numeroTel}
          />
          <TextInput
            style={[styles.input, styles.inputStandAlone, styles.password]}
            keyboardType={'numeric'}
            secureTextEntry={true}
            placeholder={'Code Pin'}
            maxLength={4}
            value={this.state.value.password}
          />
          <Content>
            <ListItem onPress={this.rememberMeonChange}>
              <CheckBox checked={this.state.checked} />
              <Body>
                <Text>Remember me</Text>
              </Body>
            </ListItem>
          </Content>
          <TouchableHighlight>
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
