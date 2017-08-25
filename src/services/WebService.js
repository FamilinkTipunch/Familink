import { Alert } from 'react-native';
import CheckReseau from './CheckReseau';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in';
const profileUrl = '/public/profiles';
const loginUrl = '/public/login';
const contactUrl = '/secured/users/contacts';
const forgotpasswordUrl = '/public/forgot-password';

export function onAlert() {
  Alert.alert(
    'Connectivity',
    'Pas de connexion wifi',
    null,
    { cancelable: false },
  );
}
export function userSignIn(signInPhone, signInpassword, signInfirstName,
  signInlastName, signInemail, signInprofile) {
  if (CheckReseau.checkConnectivity() === false) {
    onAlert();
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

export function getProfile() {
  if (CheckReseau.checkConnectivity() === false) {
    onAlert();
  }
  return fetch(apiUrl + profileUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}

export function canLogin(loginPhone, loginPin) {
  if (CheckReseau.checkConnectivity() === false) {
    onAlert();
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

export async function getContacts(token) {
  return fetch(apiUrl + contactUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.json());
}


export async function createContact(contactPhone, contactFirstName, contactLastName,
  contactEmail, contactProfile, contacturlGravatar, userToken) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
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
      throw error;
    }
  }
}
