import { Component } from 'react';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';

export default class WebService extends Component {
  static userSignIn(signInPhone, signInpassword, signInfirstName,
    signInlastName, signInemail, signInprofile) {
    console.log(signInPhone);
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

  static getProfile() {
    return fetch(apiUrl + profileUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  }
}
