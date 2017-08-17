import React, { Component, PropTypes } from 'react';
import { Button, Dimensions, StyleSheet, ScrollView, View, Image, Text } from 'react-native';

const window = Dimensions.get('window');
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
          onPress={() => onItemSelected('About')}
          style={styles.item}
        >
          About
        </Text>
        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
          Contacts
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

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
