import React, { Component } from 'react';
import Popup from 'react-native-popup';
import { Button, View, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/Menu';
import { styles } from './styles/styles';

import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';

const image = require('../assets/menu.png');

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
            <Button
              onPress={this.navigateToPhoneBookList}
              title="PhoneBookList"
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
          <Popup ref={popup => (this.popup = popup)} />
        </SideMenu>
      );
    }
}
