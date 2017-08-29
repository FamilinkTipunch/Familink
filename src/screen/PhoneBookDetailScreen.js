import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/Menu';

import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { MODIFCONTACT_SCREEN_NAME } from './PhoneBookModify';

import { styles, transparent } from './styles/styles';

export const PHONEBOOKDETAIL_SCREEN_NAME = 'PHONEBOOKDETAIL_SCREEN';

export default class PhoneBookDetailScreen extends Component {
    static navigationOptions = {
      title: 'PhoneBookDetail',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToPhoneBookModify = this.navigateToPhoneBookModify.bind(this);
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

    navigateToPhoneBookList() {
      this.navigate(PHONEBOOKLIST_SCREEN_NAME);
    }

    navigateToPhoneBookModify() {
      this.navigate(MODIFCONTACT_SCREEN_NAME);
    }

    render() {
      const menu = <Menu navigation={this.props.navigation} />;
      const { params } = this.props.navigation.state;
      const { navigate } = this.props.navigation;
      console.log(params);
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View style={styles.container}>
            <Image
              source={params.item.gravatar !== ''
                ? { uri: params.item.gravatar }
                : { uri: 'http://russfik.ru/templates/Blogss/dleimages/noavatar.png' }}
              style={styles.avatarDetailContact}
            />
            <Text>{params.item.phone}</Text>
            <Text>{params.item.firstName}</Text>
            <Text>{params.item.lastName}</Text>
            <Text>{params.item.email}</Text>
            <Text>{params.item.profile}</Text>
            <TouchableHighlight
              onPress={() => navigate(MODIFCONTACT_SCREEN_NAME, { params })}
              underlayColor={transparent}
            >
              <Text style={styles.inputLoginCreateAccount}>Modifier</Text>
            </TouchableHighlight>

          </View>
        </SideMenu>
      );
    }
}
