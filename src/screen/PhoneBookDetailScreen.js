import React, { Component } from 'react';
import { Text, TextInput, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';

import { PHONEBOOKLIST_SCREEN_NAME } from './PhoneBookListScreen';
import { MODIFCONTACT_SCREEN_NAME } from './PhoneBookModifyScreen';
import Storage from '../services/Storage';
import { styles, transparent } from './styles/styles';
import { deleteContact } from '../services/WebService';

export const PHONEBOOKDETAIL_SCREEN_NAME = 'PHONEBOOKDETAIL_SCREEN';

export default class PhoneBookDetailScreen extends Component {
    static navigationOptions = {
      title: 'Details du contact',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToPhoneBookList = this.navigateToPhoneBookList.bind(this);
      this.navigateToPhoneBookModify = this.navigateToPhoneBookModify.bind(this);
      this.toggle = this.toggle.bind(this);
      this.delete = this.delete.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        Token: '',
        id: '',
      };
    }
    async componentWillMount() {
      this.setState({
        Token: await Storage.getData('@Token:key'),
      });
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
    async delete(contactId) {
      const status = await deleteContact(this.state.Token, contactId);
      if (status === 1) {
        Toast.show('Le contact est supprimé');
        this.navigateToPhoneBookList();
      }
      if (status === 401) {
        this.navigateToLogin();
      }
    }

    render() {
      const { params } = this.props.navigation.state;
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <ScrollView scrollsToTop={false} style={styles.signin}>
            <Image
              source={params.item.gravatar !== ''
                ? { uri: params.item.gravatar }
                : { uri: 'http://russfik.ru/templates/Blogss/dleimages/noavatar.png' }}
              style={styles.avatarDetailContact}
            />
            <TextInput
              style={[styles.input, styles.inputTop, styles.blue, styles.marginTop]}
              underlineColorAndroid={transparent}
              editable={false}
              value={params.item.phone}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={params.item.firstName}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={params.item.lastName}
            />
            <TextInput
              style={[styles.input, styles.inputMiddle, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={params.item.email}
            />
            <TextInput
              style={[styles.input, styles.inputBottom, styles.blue]}
              underlineColorAndroid={transparent}
              editable={false}
              value={params.item.profile}
            />
            <TouchableHighlight
              onPress={() => navigate(MODIFCONTACT_SCREEN_NAME, { params })}
              underlayColor={transparent}
            >
              <View style={styles.modifyButton}>
                <Text style={styles.validateText}>Modifier</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.delete(params.item._id)}
              underlayColor={transparent}
            >
              <View style={styles.confirmationButton}>
                <Text style={styles.validateText}>Supprimer</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      );
    }
}
