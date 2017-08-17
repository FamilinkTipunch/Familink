'use strict';

var React = require('react-native');
var { StyleSheet } = React;

const darkPurple = "#330136";
const purple = "#5E1742";
const lightPurple = "#962E40";
const darkOrange = "#C9463D";
const orange = "#FF5E35";
const white = "#FFF";

module.exports = StyleSheet.create({

  button: {
    position: 'absolute',
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: purple,
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
    borderWidth: 2,
    borderColor: white,
  },
  name: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: '600',
    left: 60,
    top: 8,
    color: white,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color: white,
  },

});