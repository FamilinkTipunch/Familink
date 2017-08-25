import React, { Component } from 'react';
import { View, Image, FlatList, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import Popup from 'react-native-popup';
import SideMenu from 'react-native-side-menu';
import Lodash from 'lodash';
import { transparent, styles } from './styles/styles';
import Menu from './burgermenu/burgermenu';
import WebService from '../services/WebService';

import { FORGOTTENPASSWORD_SCREEN_NAME } from './ForgottenPasswordScreen';
import { HOME_SCREEN_NAME } from './HomeScreen';
import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { AUTH_SCREEN_NAME } from './AuthentificationScreen';
import { LOGIN_SCREEN_NAME } from './LoginScreen';

const burgerIcon = require('../assets/menu.png');
const searchIcon = require('../assets/search.png');

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
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        search: '',
        contacts: [],
        contactsFilter: [],
      };
      this.state.contactsFilter = this.state.contacts;
    }

    async componentWillMount() {
      this.setState({
        contacts: await WebService.getContacts(),
        contactsFilter: await WebService.getContacts(),
      });
      this.setState({
        contacts: Lodash.orderBy(this.state.contacts, ['firstName'], ['asc']),
        contactsFilter: Lodash.orderBy(this.state.contactsFilter, ['firstName'], ['asc']),
      });
    }

    onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
        selectedItem: item,
      },
      );

    debug = (search) => {
      if (search !== '') {
        this.state.contactsFilter = Lodash.filter(
          this.state.contacts, item => item.firstName.indexOf(search) > -1,
        );
      } else {
        this.state.contactsFilter = this.state.contacts;
      }
    }

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
                value={this.state.search}
                onChangeText={(search) => {
                  this.debug(search);
                  this.setState({ search });
                }
                }
              />
            </View>
            <ScrollView scrollsToTop={true} style={styles.contactList}>
              <View>
                <FlatList
                  data={this.state.contactsFilter}
                  renderItem={({ item }) => (
                    <View>
                      <Image
                        source={{ uri: item.gravatar }}
                        style={styles.avatar}
                      />
                      <Text style={styles.contactText}>{item.firstName} {item.lastName}</Text>
                      <Text style={styles.contactDetailText}>{item.phone}</Text>
                      <View style={styles.line} /></View>
                  )}
                />
                <View style={styles.marginBottom} />
              </View>
            </ScrollView>
            <Popup /*eslint-disable*/ ref={popup => (this.popup = popup)} /*eslint-enable*//>
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
