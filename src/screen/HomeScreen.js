import React, { Component } from 'react';
import Popup from 'react-native-popup';
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/Menu';
import { styles, transparent } from './styles/styles';

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
      };
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
                Bienvenu Thibaut sur votre application.
                Je sais que vous êtes sénior. Je vous invite donc à consulter
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
