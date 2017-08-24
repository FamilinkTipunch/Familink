import { Component } from 'react';
import { Alert } from 'react-native';
import CheckReseau from './CheckReseau';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';
const loginUrl = '/public/login';

export default class WebService extends Component {
  static onAlert() {
    Alert.alert(
      'Connectivity',
      'Pas de connexion wifi',
      null,
      { cancelable: false },
    );
  }
  static userSignIn(signInPhone, signInpassword, signInfirstName,
    signInlastName, signInemail, signInprofile) {
    if (CheckReseau.checkConnectivity() === false) {
      WebService.onAlert();
    }
    return fetch(apiUrl + signInUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: signInPhone,
        password: signInpassword,
        firstName: signInfirstName,
        lastName: signInlastName,
        email: signInemail,
        profile: signInprofile,
      }),
    }).then(response => response.json()).catch(err => err);
  }

  static async getProfile() {
    if (CheckReseau.checkConnectivity() === false) {
      WebService.onAlert();
    }
    return fetch(apiUrl + profileUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  }

  static canLogin(loginPhone, loginPin) {
    if (CheckReseau.checkConnectivity() === false) {
      WebService.onAlert();
    }
    return fetch(apiUrl + loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: loginPhone,
        password: loginPin,
      }),
    }).then(response => response.json()).catch(err => err);
  }
}
