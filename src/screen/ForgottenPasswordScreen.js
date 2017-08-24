import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/burgermenu';

import { LOGIN_SCREEN_NAME } from './LoginScreen';

const image = require('../assets/menu.png');
const styles = require('./styles/styles');

export const FORGOTTENPASSWORD_SCREEN_NAME = 'FORGOTTENPASSWORD_SCREEN';

export default class ForgottenPasswordScreen extends Component {
    static navigationOptions = {
      title: 'ForgottenPassword',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToLogin = this.navigateToLogin.bind(this);
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
            <Text>Page ForgottenPassword</Text>
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
        </SideMenu>
      );
    }
}
