import React, { Component } from 'react';
import FAB from 'react-native-fab';
import { View, Image, FlatList, TextInput, Text, ScrollView, TouchableOpacity, Icon } from 'react-native';
import Popup from 'react-native-popup';
import SideMenu from 'react-native-side-menu';
import { transparent, styles } from './styles/styles';
import Menu from './burgermenu/burgermenu';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';
import { ADDCONTACT_SCREEN_NAME } from './AddContactScreen';

const burgerIcon = require('../assets/menu.png');
const searchIcon = require('../assets/search.png');
const einstein = require('../assets/einstein.jpg');
const curie = require('../assets/curie.jpg');
const bohr = require('../assets/bohr.jpg');
const cori = require('../assets/cori.jpg');
const dirac = require('../assets/dirac.jpg');
const mayer = require('../assets/mayer.jpg');
const fermi = require('../assets/fermi.jpg');
const hodgkin = require('../assets/hodgkin.jpg');

export const PHONEBOOKLIST_SCREEN_NAME = 'PHONEBOOKLIST_SCREEN';

export default class PhoneBookListScreen extends Component {
    static navigationOptions = {
      title: 'PhoneBookList',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToHome = this.navigateToHome.bind(this);
      this.navigateToLogin = this.navigateToLogin.bind(this);
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToAuthentification = this.navigateToAuthentification.bind(this);
      this.navigatetoForgottenPassword = this.navigateToForgottenPassword.bind(this);
      this.navigateToAddContact = this.navigateToAddContact.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
      };
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

    navigateToAddContact() {
      this.navigate(ADDCONTACT_SCREEN_NAME);
    }

    navigateToForgottenPassword() {
      this.navigate(FORGOTTENPASSWORD_SCREEN_NAME);
    }

    navigateToHome() {
      this.navigate(HOME_SCREEN_NAME);
    }

    navigateToPhoneBookList() {
      this.navigate(PHONEBOOKDETAIL_SCREEN_NAME);
    }

    navigateToAuthentification() {
      this.navigate(AUTH_SCREEN_NAME);
    }

    navigateToLogin() {
      this.navigate(LOGIN_SCREEN_NAME);
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
            <View style={styles.marginSearch}>
              <Image
                source={searchIcon}
                style={[styles.absolute, styles.search]}
              />
              <TextInput
                style={[styles.input, styles.inputSearch, styles.padding]}
                placeholder={'Recherche'}
                autoCapitalize={'sentences'}
                autoCorrect={false}
                underlineColorAndroid={transparent}
              />
            </View>
            <ScrollView scrollsToTop={true} style={styles.contactList}>
              <View>
                <FlatList
                  data={[
                    { key: 'Albert Einstein', tel: '06 99 99 99 99', image: einstein },
                    { key: 'Marie Curie', tel: '06 92 92 92 92', image: curie },
                    { key: 'Niels Bohr', tel: '06 05 05 05 05', image: bohr },
                    { key: 'Gerty Theresa Cori', tel: '06 47 47 47 47', image: cori },
                    { key: 'Paul Dirac', tel: '06 33 33 33 33', image: dirac },
                    { key: 'Maria Goeppert-Mayer', tel: '06 63 63 63 63', image: mayer },
                    { key: 'Enrico Fermi', tel: '06 10 01 00 10', image: fermi },
                    { key: 'Dorothy Hodgkin', tel: '06 64 64 64 64', image: hodgkin },
                  ]}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={item.image}
                        style={styles.avatar}
                      />
                      <Text style={styles.contactText}>{item.key}</Text>
                      <Text style={styles.contactDetailText}>{item.tel}</Text>
                      <View style={styles.line} />
                    </View>
                  )}
                />
                <View style={styles.marginBottom} />
              </View>
            </ScrollView>
            <Popup ref={popup => (this.popup = popup)} />
            <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={() => this.navigateToAddContact()} visible={true} />
          </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={burgerIcon}
              style={styles.burgerStyle}
            />
          </TouchableOpacity>
        </SideMenu>
      );
    }
}
