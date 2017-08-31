import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './burgermenu/Menu';
import Storage from '../services/Storage';

import { styles } from './styles/styles';

export const PROFIL_SCREEN_NAME = 'PROFIL_SCREEN';

export default class ProfilScreen extends Component {
    static navigationOptions = {
      title: 'PhoneBookDetail',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.state = {
        isOpen: false,
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        profil: '',
      };
    }
    async componentWillMount() {
      this.setState({
        firstName: await Storage.getData('@FirstName:key'),
        lastName: await Storage.getData('@LastName:key'),
        email: await Storage.getData('@Email:key'),
        profil: await Storage.getData('@Profil:key'),
      });
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
              <Text >{this.state.firstName}</Text>
              <Text >{this.state.lastName}</Text>
              <Text >{this.state.email}</Text>
              <Text >{this.state.profil}</Text>
            </ScrollView>
          </View>
        </SideMenu>
      );
    }
}
