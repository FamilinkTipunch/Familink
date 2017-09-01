import React, { Component } from 'react';
import { FlatList, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Lodash from 'lodash';
import Toast from 'react-native-simple-toast';

import { styles, transparent } from './styles/styles';
import Menu from './burgermenu/Menu';
import Storage from '../services/Storage';
import { getContacts } from '../services/WebService';

import { PHONEBOOKDETAIL_SCREEN_NAME } from './PhoneBookDetailScreen';
import { ADDCONTACT_SCREEN_NAME } from './AddContactScreen';

const burgerIcon = require('../assets/menu.png');
const searchIcon = require('../assets/search.png');

export const PHONEBOOKLIST_SCREEN_NAME = 'PHONEBOOKLIST_SCREEN';

export default class PhoneBookListScreen extends Component {
    static navigationOptions = {
      title: 'Liste des contacts',
    };

    constructor(props) {
      super(props);
      this.navigate = this.props.navigation.navigate;
      this.navigateToAddContact = this.navigateToAddContact.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        selectedItem: 'About',
        search: '',
        contacts: [],
        contactsFilter: [],
        letter: '',
        scrollIndicator: 0,
        alphabetLetter: [
          { letter: 'A' }, { letter: 'B' }, { letter: 'C' }, { letter: 'D' },
          { letter: 'E' }, { letter: 'F' }, { letter: 'G' }, { letter: 'H' },
          { letter: 'I' }, { letter: 'J' }, { letter: 'K' }, { letter: 'L' },
          { letter: 'M' }, { letter: 'N' }, { letter: 'O' }, { letter: 'P' },
          { letter: 'Q' }, { letter: 'R' }, { letter: 'S' }, { letter: 'T' },
          { letter: 'U' }, { letter: 'V' }, { letter: 'W' }, { letter: 'X' },
          { letter: 'Y' }, { letter: 'Z' }, { letter: '#' },
        ],
        token: '',
      };
      this.state.contactsFilter = this.state.contacts;
    }

    async componentWillMount() {
      await Storage.getData('@Token:key').then((value) => {
        this.setState({ token: value });
      });
      this.setState({
        contacts: await getContacts(this.state.token),
      });
      if (this.state.contacts === 401 || this.state.contactsFilter === 401) {
        Toast.show('Votre token est plus valide, veuillez vous reconnecter');
        this.navigateToLogin();
      }
      this.setState({
        contacts: Lodash.orderBy(this.state.contacts, [contact => contact.firstName.toLowerCase()], ['asc']),
      });
      const contacts = Lodash.forEach(this.state.contacts, (value) => {
        value.firstName = Lodash.upperFirst(value.firstName.toLowerCase());
        if (value.lastName) {
          value.lastName = Lodash.upperFirst(value.lastName.toLowerCase());
        }
      });
      this.setState({ contactsFilter: contacts });
    }

    onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
        selectedItem: item,
      },
      );

    searchInput = (search) => {
      if (search !== '') {
        this.state.contactsFilter = Lodash.filter(
          this.state.contacts, item => item.firstName.indexOf(search) > -1,
        );
      } else {
        this.state.contactsFilter = this.state.contacts;
      }
    }

    alphabetSelector = (letter) => {
      this.setState({ scrollIndicator: 0 });
      for (let i = 0; this.state.alphabetLetter[i].letter !== letter; i += 1) {
        if (i === 0) {
          this.setState({
            count: this.state.scrollIndicator +=
            (Platform.OS === 'ios')
              ? 97 +
              (86.5 *
                (Lodash.filter(
                  this.state.contacts, item =>
                    item.firstName.indexOf(
                      this.state.alphabetLetter[i].letter) > -1).length -
                      1))
              : 103 +
              (92.5 *
                (Lodash.filter(
                  this.state.contacts, item =>
                    item.firstName.indexOf(
                      this.state.alphabetLetter[i].letter) > -1).length -
                      1)),
          });
        } else {
          this.setState({
            count: this.state.scrollIndicator +=
            (Platform.OS === 'ios')
              ? 86.5 *
              Lodash.filter(
                this.state.contacts, item =>
                  item.firstName.indexOf(
                    this.state.alphabetLetter[i].letter) > -1).length
              : 92.5 *
              Lodash.filter(
                this.state.contacts, item =>
                  item.firstName.indexOf(
                    this.state.alphabetLetter[i].letter) > -1).length,
          });
        }
      }
      this.scrollView.scrollTo({
        y: this.state.scrollIndicator,
        animated: true,
      });
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }

    navigateToAddContact() {
      this.navigate(ADDCONTACT_SCREEN_NAME);
    }

    render() {
      const menu = <Menu navigation={this.props.navigation} />;
      const { navigate } = this.props.navigation;
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View style={styles.container}>
            <View style={styles.marginSearch}>
              <Image
                source={searchIcon}
                style={[styles.absolute, styles.search]}
              />
              <TextInput
                style={[styles.input, styles.inputSearch, styles.padding]}
                placeholder={'Recherche'}
                autoCapitalize={'sentences'}
                autoCorrect={false}
                underlineColorAndroid={transparent}
                value={this.state.search}
                onChangeText={(search) => {
                  this.searchInput(search);
                  this.setState({ search });
                }
                }
              />
            </View>
            <FlatList
              data={this.state.alphabetLetter}
              style={[styles.absolute, styles.alphabetView]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    const letter = item.letter;
                    this.alphabetSelector(letter);
                  }}
                >
                  <Text style={styles.alphabetText}>{item.letter}</Text>
                </TouchableOpacity>
              )}
            />
            <ScrollView
              scrollsToTop={true}
              style={styles.contactList}
              ref={(scrollView) => { this.scrollView = scrollView; }}
            >
              <View>
                <FlatList
                  data={this.state.contactsFilter}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => navigate(PHONEBOOKDETAIL_SCREEN_NAME, { item })}
                    >
                      <View>
                        <Image
                          source={item.gravatar !== ''
                            ? { uri: item.gravatar }
                            : { uri: 'https://s-media-cache-ak0.pinimg.com/736x/dd/45/96/dd4596b601062eb491ea9bb8e3a78062--two-faces-baby-faces.jpg' }
                          }
                          style={styles.avatar}
                        />
                        <Text
                          style={styles.contactText}
                          numberOfLines={1}
                        >
                          {item.firstName} {item.lastName}
                        </Text>
                        <Text style={styles.contactDetailText} numberOfLines={1}>{item.phone}</Text>
                        <View style={styles.line} /></View>
                    </TouchableOpacity>
                  )}
                />
                <View style={styles.marginBottom} />
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.navigateToAddContact()}
              style={styles.buttonAdd}
            >
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={burgerIcon}
              style={styles.burgerStyle}
            />
          </TouchableOpacity>
        </SideMenu>
      );
    }
}
