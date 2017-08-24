import React, { Component } from 'react';
import Popup from 'react-native-popup';
import { Button, View, Image, TouchableOpacity, NetInfo } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/burgermenu';
import { styles } from './styles/styles';
import CheckReseau from '../services/CheckReseau';

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

    // Fonction affichage et création de la forme de la popup      
    componentDidMount() {
      NetInfo.isConnected.addEventListener(
        'change',
        this.handleConnectivityChange,
      );
      CheckReseau.isConnected().then((appIsConnected) => {
        this.setState({
          isConnected: appIsConnected,
        });
      });
    }

    componentWillUnmount() {
      NetInfo.isConnected.removeEventListener(
        'change',
        this.handleConnectivityChange,
      );
    }

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

    handleConnectivityChange = (appIsConnected) => {
      this.setState({ isConnected: appIsConnected });
    };

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
