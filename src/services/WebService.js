import { Component } from 'react';
import { Alert } from 'react-native';
import CheckReseau from './CheckReseau';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';
const loginUrl = '/public/login';
const contactUrl = '/secured/users/contacts';

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

  static async getContacts() {
    return fetch(apiUrl + contactUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA2MDYwNjA2MDYiLCJpYXQiOjE1MDM2NjQzNDgsImV4cCI6MTUwMzY2NTI0OH0.wW_kzI16y6OKBgA6MC0wpswsoDLAfJtG5N2UnUnrIVI',
      },
    }).then(response => response.json());
  }
}
