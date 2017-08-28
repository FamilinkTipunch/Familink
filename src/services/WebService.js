import { Component } from 'react';
import { Alert } from 'react-native';
import CheckReseau from './CheckReseau';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';
const loginUrl = '/public/login';
const contactUrl = '/secured/users/contacts';
const forgotpasswordUrl = '/public/forgot-password';

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


  static async createContact(contactPhone, contactFirstName, contactLastName,
    contactEmail, contactProfile, contacturlGravatar, userToken) {
    try {
      if (CheckReseau.checkConnectivity() === false) {
        WebService.onAlert();
        return null;
      }

      const response = await fetch(apiUrl + contactUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          phone: contactPhone,
          firstName: contactFirstName,
          lastName: contactLastName,
          email: contactEmail,
          profile: contactProfile,
          gravatar: contacturlGravatar,
        }),
      });
      const status = response.status;
      if (status === 200) {
        return 1;
      }
      return response.status;
    } catch (error) {
      return -1;
    }
  }

  static async forgotPassword(passwordPhone) {
    try {
      if (CheckReseau.checkConnectivity() === false) {
        WebService.onAlert();
        return null;
      }

      const response = await fetch(apiUrl + forgotpasswordUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: passwordPhone,
        }),
      });
      const status = response.status;
      if (status === 200 || status === 204) {
        return 1;
      }
      return response.status;
    } catch (error) {
      return -1;
    }
  }
}
