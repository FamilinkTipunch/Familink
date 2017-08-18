import React, { Component } from 'react';
import Popup from 'react-native-popup';
import { Button, Text, View, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/burgermenu';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGOUT_SCREEN_NAME } from './LogoutScreen';

const image = require('../assets/menu.png');
const styles = require('./styles/styles');

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
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
      };
    }

    onMenuItemSelected = (item) => {
      this.setState({
        isOpen: false,
        selectedItem: item,
      });
      this.props.navigator.replace({ id: item });
    }

  // Fonction affichage et création de la forme de la popup     
    onTestAlerte() {
      // alert 
      this.popup.alert(1);
      this.popup.confirm({
        content: 'Are you ready?',
      });

      this.popup.confirm({
        content: 'Are you ready?',
        ok: {
          callback: () => {
            this.popup.alert('Very good!');
          },
        },
      });

      this.popup.confirm({
        title: 'title',
        content: ['Message'],
        ok: {
          text: 'Accepter',
          style: {
            color: 'blue',
          },
          callback: () => {
            this.popup.alert('Good!');
          },
        },
        cancel: {
          text: 'Refuser',
          style: {
            color: 'red',
          },
          callback: () => {
            this.popup.alert('ok ！');
          },
        },
      });
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
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

    navigateToForgottenPassword() {
      this.navigate(FORGOTTENPASSWORD_SCREEN_NAME);
    }
    render() {
      const menu = <Menu navigation={this.props.navigation} />;
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View style={styles.container}>
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
            <Button
              onPress={this.onTestAlerte.bind(this)}
              title="TestAlert"
            />
          </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={image}
              style={styles.burgerStyle}
            />
          </TouchableOpacity>
          <Popup /*eslint-disable*/ ref={popup => (this.popup = popup)} /*eslint-enable*//>
        </SideMenu>
      );
    }
}
