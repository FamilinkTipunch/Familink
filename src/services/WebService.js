import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import CheckReseau from './CheckReseau';

const apiUrl = 'https://familink.cleverapps.io';
const signInUrl = '/public/sign-in/';
const profileUrl = '/public/profiles/';
const loginUrl = '/public/login/';
const contactUrl = '/secured/users/contacts/';
const forgotpasswordUrl = '/public/forgot-password/';
const userUrl = '/secured/users/current/';

function onAlert() {
  Alert.alert(
    'Connectivity',
    'Pas de connexion wifi',
    null,
    { cancelable: false },
  );
}
export async function userSignIn(signInPhone, signInpassword, signInfirstName,
  signInlastName, signInemail, signInprofile) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }
    const response = await fetch(apiUrl + signInUrl, {
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
    });
    const status = response.status;
    if (status === 200) {
      return 1;
    }
    Toast.show(`Une erreur est survenue lors de votre enregistrement avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}

export async function getProfile() {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }
    const response = await fetch(apiUrl + profileUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const status = response.status;
    if (status === 200) {
      return response.json();
    }
    Toast.show(`Une erreur est survenue lors de la récupération des profiles avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}

export async function canLogin(loginPhone, loginPin) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }
    const response = await fetch(apiUrl + loginUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: loginPhone,
        password: loginPin,
      }),
    });
    const status = response.status;
    if (status === 200) {
      return response.json();
    }
    Toast.show(`Une erreur est survenue lors de la connexion avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}


export async function getContacts(token) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }
    const response = await fetch(apiUrl + contactUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const status = response.status;
    if (status === 200) {
      return response.json();
    }
    if (status === 401) {
      Toast.show('Votre token est plus valide, veuillez vous reconnecter');
      return response.status;
    }
    Toast.show(`Une erreur est survenue lors de la récupération des contacts avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
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
    if (status === 401) {
      Toast.show('Votre token est plus valide, veuillez vous reconnecter');
      return response.status;
    }
    Toast.show(`Une erreur est survenue lors de la création des contacts avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}

export async function forgotPassword(passwordPhone) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
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
    Toast.show(`Une erreur est survenue lors de la saisi du numéro avec le code erreur: ${status}`);
    return response.status;
  } catch (error) {
    throw error;
  }
}

export async function deleteContact(token, contactId) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }
    const response = await fetch(apiUrl + contactUrl + contactId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const status = response.status;
    if (status === 200 || status === 204) {
      return 1;
    }
    if (status === 401) {
      Toast.show('Votre token est plus valide, veuillez vous reconnecter');
      return response.status;
    }
    Toast.show(`Une erreur est survenue lors de la suppression du contact avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}

export async function updateContact(contactPhone, contactFirstName, contactLastName,
  contactEmail, contactProfile, contacturlGravatar, userToken, contactId) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }

    const response = await fetch(apiUrl + contactUrl + contactId, {
      method: 'PUT',
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
    if (status === 200 || status === 204) {
      return 1;
    }
    if (status === 401) {
      Toast.show('Votre token est plus valide, veuillez vous reconnecter');
      return response.status;
    }
    Toast.show(`Une erreur est survenue lors de la modification du contacts avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}
export async function getUserAuthenticated(userToken) {
  try {
    if (CheckReseau.checkConnectivity() === false) {
      onAlert();
      return null;
    }

    const response = await fetch(apiUrl + userUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    const status = response.status;
    if (status === 200) {
      return response.json();
    }
    if (status === 401) {
      Toast.show('Votre token est plus valide, veuillez vous reconnecter');
      return response.status;
    }
    Toast.show(`Une erreur est survenue lors de la modification du contacts avec le code erreur:${response.status}`);
    return response.status;
  } catch (error) {
    return -1;
  }
}
