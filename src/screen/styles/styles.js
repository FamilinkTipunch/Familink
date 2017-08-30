const React = require('react-native');

const { StyleSheet, Platform } = React;

const darkPurple = 'rgba(51, 1, 54, 1)';
const purple = 'rgba(83, 23, 66, 1)';
const lightPurple = 'rgba(150, 46, 64, 1)';
const trlightPurple = 'rgba(150, 46, 64, 0.1)';
const darkOrange = 'rgba(201, 70, 61, 1)';
const orange = 'rgba(255, 94, 53, 1)';
const darkBlue = 'rgba(24, 72, 92, 1)';
const white = 'rgba(255, 255, 255, 1)';
const trWhite = 'rgba(255, 255, 255, 0.5)';
const grey = 'rgba(240, 240, 240, 1)';
const darkerGrey = 'rgba(150, 150, 150, 1)';

export const darkGrey = 'rgba(200, 200, 200, 1)';
export const transparent = 'transparent';

export const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 10,
    zIndex: 2,
  },
  marginSearch: {
    padding: 30,
    borderBottomColor: darkGrey,
    borderColor: transparent,
    borderWidth: 0.5,
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
  },
  contactText: {
    marginTop: -50,
    marginLeft: 60,
    marginBottom: 30,

    fontSize: 22,
    fontWeight: '300',

    color: darkBlue,
  },
  contactDetailText: {
    marginTop: -30,
    marginLeft: 60,
    marginBottom: 50,

    fontSize: 18,
    color: darkerGrey,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: grey,
  },
  list: {
    backgroundColor: grey,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: orange,
    marginBottom: 5,
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: purple,
    padding: 20,
  },
  signin: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: grey,
    padding: 30,
  },
  contactList: {
    flex: 1,
    width: window.width,
    height: window.height,
    padding: 30,
    paddingRight: 50,
  },
  contactMargin: {
    marginTop: 40,
  },
  contactMarginBottom: {
    marginTop: 40,
    marginBottom: 70,
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

    borderWidth: 0.5,
    borderColor: darkGrey,
  },
  avatarDetailContact: {
    width: 70,
    height: 70,

    borderRadius: 35,
    alignSelf: 'center',

    borderWidth: 0.5,
    borderColor: darkGrey,
  },
  name: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: '600',
    left: 60,
    top: 8,
    color: lightPurple,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color: darkOrange,
  },
  burgerStyle: {
    width: 32,
    height: 32,
  },
  search: {
    marginLeft: 46,
    marginTop: (Platform.OS === 'ios') ? 40 : 44,
    width: 22,
    height: 22,
  },
  add: {
    marginLeft: 0,
    marginTop: 0,
    width: 50,
    height: 50,
  },
  input: {
    width: window.width,

    fontSize: 18,

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

    borderWidth: 0.5,
    borderColor: darkGrey,

    backgroundColor: trWhite,
  },
  padding: {
    paddingLeft: 50,
  },
  inputFalse: {
    backgroundColor: trlightPurple,
  },
  inputTop: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomColor: transparent,
  },
  inputMiddle: {
    borderBottomColor: transparent,
  },
  inputBottom: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

    marginBottom: 20,
  },
  inputStandAlone: {
    borderRadius: 5,

    marginBottom: 20,
  },
  inputSearch: {
    borderRadius: 5,
  },
  classic: {
    color: darkPurple,
  },
  blue: {
    color: darkBlue,
  },
  confirmationButton: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 5,

    backgroundColor: lightPurple,
  },
  modifyButton: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,

    marginBottom: 20,

    borderRadius: 5,

    backgroundColor: darkBlue,
  },
  actionSheet: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: darkGrey,

    backgroundColor: trWhite,

    marginBottom: 20,
  },
  listSheet: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,

    borderWidth: 0.5,
    borderColor: darkGrey,

    backgroundColor: trWhite,
  },
  sheetText: {
    fontSize: 18,
    color: darkBlue,
    marginLeft: 20,
  },
  validateText: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: white,
  },
  containerCreateAccount: {
    flex: 1,
    width: window.width,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLoginCreateAccount: {
    fontSize: 18,
    color: darkBlue,
  },
  checkboxLogin: {
    width: window.width,
  },
  line: {
    borderBottomColor: darkGrey,
    borderBottomWidth: 0.5,

    marginTop: -30,
    marginBottom: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
  marginTop: {
    marginTop: 20,
  },
  alphabetView: {
    alignSelf: 'flex-end',
    marginTop: 110,
    padding: 20,
  },
  alphabetText: {
    textAlign: 'center',
    color: darkBlue,
    marginBottom: (Platform.OS === 'ios') ? 0 : -4,
  },
  textForgotPassword: {
    fontSize: 15,
    color: darkBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
});
