import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput, Image, TouchableHighlight } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Toast from 'react-native-simple-toast';
import Storage from '../services/Storage';
import { updateUser, getProfile } from '../services/WebService';
import { HOME_SCREEN_NAME } from './HomeScreen';

import { styles, transparent } from './styles/styles';

export const PROFIL_SCREEN_NAME = 'PROFIL_SCREEN';

const logo = require('../assets/logo.png');

const title = 'Quel statut vous correspond le mieux ?';

export default class ProfilScreen extends Component {
    static navigationOptions = {
      title: 'Profil',
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
        profileList: [],
        selected: 0,
      };

      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this);
      this.onPressModify = this.onPressModify.bind(this);
      this.updateProfil = this.updateProfil.bind(this);
      this.navigateToHome = this.navigateToHome.bind(this);
    }
    async componentWillMount() {
      this.setState({
        firstName: await Storage.getData('@FirstName:key'),
        lastName: await Storage.getData('@LastName:key'),
        email: await Storage.getData('@Email:key'),
        profil: await Storage.getData('@Profil:key'),
        token: await Storage.getData('@Token:key'),
        profileList: await getProfile(),
      });
    }

    onPressModify() {
      this.setState({
        editable: !this.state.editable,
      });
    }

    navigateToHome() {
      this.navigate(HOME_SCREEN_NAME);
    }

    showActionSheet() {
      this.ActionSheet.show();
    }

    handlePress(i) {
      this.setState({
        selected: i,
      });
    }

    async updateProfil() {
      const status = await updateUser(this.state.token,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.profileList[this.state.selected]);

      if (status === 1) {
        Toast.show('Votre profil a été modifié');
        Storage.setData('@FirstName:key', this.state.firstName);
        Storage.setData('@LastName:key', this.state.lastName);
        Storage.setData('@Email:key', this.state.email);
        Storage.setData('@Profil:key', this.state.profileList[this.state.selected]);
        this.onPressModify();
        this.navigateToHome();
      }
      if (status === 401) {
        console.log('erreur 401');
      }
    }

    renderButton() {
      if (this.state.editable) {
        return (

          <View>
            <View style={styles.wrapper}>
              <TouchableHighlight onPress={this.showActionSheet} underlayColor={transparent}>
                <View style={styles.actionSheet}>
                  <Text style={styles.sheetText}>
                    {this.state.profileList[this.state.selected]}
                  </Text>
                </View>
              </TouchableHighlight>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={title}
                options={this.state.profileList}
                onPress={this.handlePress}
              />
            </View>
            <TouchableHighlight
              underlayColor={transparent}
              onPress={this.updateProfil}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>Modifier</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor={transparent}
              onPress={this.onPressModify}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>Annuler</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
      }
      return (
        <View>
          <TextInput
            style={[styles.input, styles.inputBottom, styles.blue]}
            underlineColorAndroid={transparent}
            editable={false}
            value={this.state.profil}
          />
          <TouchableHighlight
            underlayColor={transparent}
            onPress={this.onPressModify}
          >
            <View style={styles.modifyButton}>
              <Text style={styles.validateText}>Modifier</Text>
            </View>
          </TouchableHighlight>
        </View>
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

            {this.renderButton()}
          </ScrollView>
        </View>
      );
    }
}
