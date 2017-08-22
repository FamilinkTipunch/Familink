const React = require('react-native');

const { StyleSheet } = React;

const darkPurple = 'rgba(51, 1, 54, 1)';
const purple = 'rgba(83, 23, 66, 1)';
const lightPurple = 'rgba(150, 46, 64, 1)';
const darkOrange = 'rgba(201, 70, 61, 1)';
const orange = 'rgba(255, 94, 53, 1)';
const white = 'rgba(255, 255, 255, 1)';
const trWhite = 'rgba(255, 255, 255, 0.5)';
const grey = 'rgba(240, 240, 240, 1)';

export const darkGrey = 'rgba(200, 200, 200, 1)';
export const transparent = 'transparent';

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
    padding: 50,
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
    borderColor: darkPurple,
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
  input: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

    borderWidth: 0.5,
    borderColor: darkGrey,

    backgroundColor: trWhite,
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
  classic: {
    color: darkPurple,
  },
  tel: {
    color: lightPurple,
  },
  password: {
    color: orange,
  },
  confirmationButton: {
    width: window.width,

    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 5,

    backgroundColor: lightPurple,
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
  sheetText: {
    fontSize: 18,
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
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
    color: orange,
  },
  checkboxLogin: {
    width: window.width,
    paddingLeft: 40,
    paddingRight: 40,
  },
});
