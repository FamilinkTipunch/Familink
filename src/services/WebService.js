import { Component } from 'react';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';
const loginUrl = '/public/login';

export default class WebService extends Component {
  static userSignIn(signInPhone, signInpassword, signInfirstName,
    signInlastName, signInemail, signInprofile) {
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
    return fetch(apiUrl + profileUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  }

  static canLogin(loginPhone, loginPin) {
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
