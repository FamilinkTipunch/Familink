import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableHighlight } from 'react-native';
import Storage from '../services/Storage';

import { styles, transparent } from './styles/styles';

export const PROFIL_SCREEN_NAME = 'PROFIL_SCREEN';

const logo = require('../assets/logo.png');

export default class ProfilScreen extends Component {
    static navigationOptions = {
      title: 'Profil',
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
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={false} style={styles.signin}>
            <Image
              source={logo}
              style={styles.avatarDetailContact}
            />
            <TextInput
              style={[styles.input, styles.inputTop, styles.blue, styles.marginTop]}
              underlineColorAndroid={transparent}
              editable={false}
              value={this.state.firstName}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={this.state.lastName}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={this.state.email}
            />
            <TextInput
              style={[styles.input, styles.inputBottom, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={this.state.profil}
            />
            <TouchableHighlight
              underlayColor={transparent}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>Modifier</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      );
    }
}
