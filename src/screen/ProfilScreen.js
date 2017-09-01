import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableHighlight } from 'react-native';
import Toast from 'react-native-simple-toast';
import Storage from '../services/Storage';
import { updateUser } from '../services/WebService';

import { styles, transparent } from './styles/styles';

export const PROFIL_SCREEN_NAME = 'PROFIL_SCREEN';

const logo = require('../assets/logo.png');

export default class ProfilScreen extends Component {
    static navigationOptions = {
      title: 'Votre profil',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.state = {
        token: '',
        isOpen: false,
        phone: '',
        firstName: '',
        lastName: '',
        email: '',
        profil: '',
        editable: false,
      };

      this.onPressModify = this.onPressModify.bind(this);
      this.updateProfil = this.updateProfil.bind(this);
    }
    async componentWillMount() {
      this.setState({
        firstName: await Storage.getData('@FirstName:key'),
        lastName: await Storage.getData('@LastName:key'),
        email: await Storage.getData('@Email:key'),
        profil: await Storage.getData('@Profil:key'),
        token: await Storage.getData('@Token:key'),
      });
    }

    onPressModify() {
      this.setState({
        editable: !this.state.editable,
      });
    }

    async updateProfil() {
      const status = await updateUser(this.state.token,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.profil);

      if (status === 1) {
        Toast.show('Votre profil a été modifié');
        this.onPressModify();
      }
      if (status === 401) {
        console.log('erreur 401');
      }
    }

    renderButton() {
      if (this.state.editable) {
        return (
          <View>
            <TouchableHighlight
              underlayColor={transparent}
              onPress={this.updateProfil}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>MODIFIER</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={transparent}
              onPress={this.onPressModify}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>ANNULER</Text>
              </View>
            </TouchableHighlight>
          </View>

        );
      }

      return (
        <TouchableHighlight
          underlayColor={transparent}
          onPress={this.onPressModify}
        >
          <View style={styles.modifyButton}>
            <Text style={styles.validateText}>Modifier</Text>
          </View>
        </TouchableHighlight>
      );
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
              editable={this.state.editable}
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName })}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={this.state.editable}
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName })}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={this.state.editable}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              style={[styles.input, styles.inputBottom, styles.blue]}
              underlineColorAndroid={transparent}
              editable={this.state.editable}
              value={this.state.profil}
              onChangeText={profil => this.setState({ profil })}
            />
            {this.renderButton()}
          </ScrollView>
        </View>
      );
    }
}
