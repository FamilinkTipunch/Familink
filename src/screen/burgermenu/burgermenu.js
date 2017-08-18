import React, { Component } from 'react';
import { Button, ScrollView, View, Image, Text } from 'react-native';

const uri = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/US_Navy_100915-N-4790M-040_Lanier_Phillips%2C_left%2C_Bill_Cosby_and_Ed_LeBaron_pose_for_a_picture_before_receiving_the_Lone_Sailor_Award_at_the_Nation_%28cropped_to_Cosby%29.jpg';
const styles = require('../styles/styles');

export default class Menu extends Component {
  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri }}
          />
          <Text style={styles.name}>Bill Cosby</Text>
        </View>
        <Text
          onPress={() => this.props.navigation.navigate('HOME_SCREEN')}
          style={styles.item}
        >
          Accueil
        </Text>
        <Text
          onPress={() => this.props.navigation.navigate('PHONEBOOKLIST_SCREEN')}
          style={styles.item}
        >
          Contacts
        </Text>
        <Text
          onPress={() => this.props.navigation.navigate('LOGOUT_SCREEN')}
          style={styles.item}
        >
          Déconnexion
        </Text>
        <Button
          onPress={this.navigateToPhoneBookList}
          style={styles.item}
          title="PhoneBookList"
        />
      </ScrollView>
    );
  }
}
