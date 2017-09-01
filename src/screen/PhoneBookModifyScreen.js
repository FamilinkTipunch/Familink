import React, { Component } from 'react';
import { Text, TextInput, ScrollView, TouchableHighlight, View } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Popup from 'react-native-popup';
import Toast from 'react-native-simple-toast';
import { transparent, styles } from './styles/styles';
import LoadingScreen from './LoadingScreen';
import Storage from '../services/Storage';
import { updateContact, getProfile } from '../services/WebService';
import { emailRegex, phoneRegex } from '../Tools/Regex';
import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';

const title = 'Quel statut vous correspond le mieux ?';

export const MODIFCONTACT_SCREEN_NAME = 'MODIFCONTACT_SCREEN';

export default class PhoneBookModifyScreen extends Component {
    static navigationOptions = {
      title: 'Modifier un contact',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.state = {
        firstName: '',
        firstNameBool: true,
        lastName: '',
        lastNameBool: true,
        email: '',
        emailBool: true,
        phone: '',
        phoneBool: true,
        allInputCorrect: 0,
        profile: '',
        profileList: null,
        firstpin: '',
        validate: false,
        selected: 0,
        urlAvatar: '',
        token: '',
      };
      this.handlePress = this.handlePress.bind(this);
      this.showActionSheet = this.showActionSheet.bind(this);
      this.modify = this.modify.bind(this);
    }
    async componentWillMount() {
      const { params } = this.props.navigation.state;
      this.setState({
        firstName: params.params.item.firstName,
        lastName: params.params.item.lastName,
        email: params.params.item.email,
        phone: params.params.item.phone,
        urlAvatar: params.params.item.gravatar,
        profile: params.params.item.profile,
        id: params.params.item._id,
        profileList: await getProfile(),
      });
    }

    componentDidMount() {
      Storage.getData('@Token:key').then((value) => {
        this.setState({ token: value });
      });
    }

    onAlert() {
      this.popup.alert('Certains champs sont incorrects\n ou vides. Veillez à remplir les\n champs en rouge afin de\n poursuivre votre enregistrement');
    }

    showActionSheet() {
      this.ActionSheet.show();
    }

    handlePress(i) {
      this.setState({
        selected: i,
      });
    }

    navigateToPhoneBookList() {
      this.navigate(PHONEBOOKLIST_SCREEN_NAME);
    }
    async modify() {
      const status = await updateContact(
        this.state.phone,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.profile,
        this.state.urlAvatar,
        this.state.token,
        this.state.id);
      if (status === 1) {
        Toast.show('Votre contact a été Modifié');
        this.navigateToPhoneBookList();
      }
      if (status === 401) {
        this.navigateToLogin();
      }
    }

    validator = () => {
      if (emailRegex.test(this.state.email) !== true) {
        this.setState({ emailBool: false });
      } else {
        this.setState({ emailBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.firstName === '') {
        this.setState({ firstNameBool: false });
      } else {
        this.setState({ firstNameBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.lastName === '') {
        this.setState({ lastNameBool: false });
      } else {
        this.setState({ lastNameBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (phoneRegex.test(this.state.phone) !== true) {
        this.setState({ phoneBool: false });
      } else {
        this.setState({ phoneBool: true });
        this.setState({ count: this.state.allInputCorrect += 1 });
      }
      if (this.state.allInputCorrect === 4) {
        this.modify();
      } else {
        this.onAlert();
      }
      this.setState({ allInputCorrect: 0 });
    }

    render() {
      if (!this.state.profileList) {
        return <LoadingScreen />;
      }
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={true} style={styles.signin}>
            <TextInput
              style={
                this.state.firstNameBool
                  ? [styles.input, styles.inputTop, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputTop, styles.classic]}
              placeholder={'Prenom'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.firstName}
              onChangeText={firstName => this.setState({ firstName, firstNameBool: true })}
            />
            <TextInput
              style={
                this.state.lastNameBool
                  ? [styles.input, styles.inputMiddle, styles.blue]
                  : [styles.input, styles.inputFalse, styles.classic]}
              placeholder={'Nom'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.lastName}
              onChangeText={lastName => this.setState({ lastName, lastNameBool: true })}
            />
            <TextInput
              style={
                this.state.emailBool
                  ? [styles.input, styles.inputMiddle, styles.blue]
                  : [styles.input, styles.inputFalse, styles.classic]}
              keyboardType={'email-address'}
              placeholder={'eMail'}
              autoCapitalize={'none'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.email}
              onChangeText={email => this.setState({ email, emailBool: true })}
            />
            <TextInput
              style={
                this.state.phoneBool
                  ? [styles.input, styles.inputBottom, styles.blue]
                  : [styles.input, styles.inputFalse, styles.inputBottom, styles.classic]}
              keyboardType={'phone-pad'}
              placeholder={'Tel'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              maxLength={10}
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone, phoneBool: true })}
            />
            <TextInput
              style={[styles.input, styles.inputStandAlone, styles.blue]}
              placeholder={'url Gravatar'}
              autoCapitalize={'sentences'}
              autoCorrect={false}
              underlineColorAndroid={transparent}
              value={this.state.urlAvatar}
              onChangeText={urlAvatar => this.setState({ urlAvatar })}
            />
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
              onPress={this.validator}
              underlayColor={transparent}
            >
              <View style={styles.confirmationButton}>
                <Text style={styles.validateText}>
                Modifier
                </Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
          <Popup ref={popup => (this.popup = popup)} />
        </View>
      );
    }
}
