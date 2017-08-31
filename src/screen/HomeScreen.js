import React, { Component } from 'react';
import Popup from 'react-native-popup';
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/Menu';
import { styles, transparent } from './styles/styles';
import { getUserAuthenticated } from '../services/WebService';
import Storage from '../services/Storage';

import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';

const image = require('../assets/menu.png');
const logo = require('../assets/logo.png');

export const HOME_SCREEN_NAME = 'HOME_SCREEN';

export default class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
      headerLeft: null,
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        isConnected: false,
        Token: '',
        firstName: '',
        lastName: '',
        profil: '',
      };
    }
    async componentWillMount() {
      this.setState({
        Token: await Storage.getData('@Token:key'),
      });
      const user = await getUserAuthenticated(this.state.Token);
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        profil: user.profile,
      });
      await Storage.setData('@FirstName:key', this.state.firstName);
      await Storage.setData('@LastName:key', this.state.lastName);
      await Storage.setData('@Email:key', user.email);
      await Storage.setData('@Profil:key', this.state.profil);
    }

    onMenuItemSelected = (item) => {
      this.setState({
        isOpen: false,
        selectedItem: item,
      });
      this.props.navigator.replace({ id: item });
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }

    navigateToPhoneBookList() {
      this.navigate(PHONEBOOKLIST_SCREEN_NAME);
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
            <ScrollView scrollsToTop={false} style={styles.signin}>
              <Image
                source={logo}
                style={styles.avatarDetailContact}
              />
              <Text style={styles.homeText}>
                Bienvenue {this.state.firstName} {this.state.lastName} sur votre application.
                Je sais que vous êtes {this.state.profil}. Je vous invite donc à consulter
                vos contacts.
              </Text>
              <TouchableHighlight
                onPress={this.navigateToPhoneBookList}
                underlayColor={transparent}
              >
                <View style={styles.confirmationButton}>
                  <Text style={styles.validateText}>Contacts</Text>
                </View>
              </TouchableHighlight>
            </ScrollView>
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
          <Popup ref={popup => (this.popup = popup)} />
        </SideMenu>
      );
    }
}
