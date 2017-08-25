import React from 'react';

import { StackNavigator } from 'react-navigation';

import AuthentificationScreen, { AUTH_SCREEN_NAME } from '../screen/AuthentificationScreen';
import HomeScreen, { HOME_SCREEN_NAME } from '../screen/HomeScreen';
import LoginScreen, { LOGIN_SCREEN_NAME } from '../screen/LoginScreen';
import PhoneBookDetailScreen, { PHONEBOOKDETAIL_SCREEN_NAME } from '../screen/PhoneBookDetailScreen';
import PhoneBookListScreen, { PHONEBOOKLIST_SCREEN_NAME } from '../screen/PhoneBookListScreen';
import ForgottenPasswordScreen, { FORGOTTENPASSWORD_SCREEN_NAME } from '../screen/ForgottenPasswordScreen';
import AddContactScreen, { ADDCONTACT_SCREEN_NAME } from '../screen/AddContactScreen';

const stackNavigatorConfig = {};

stackNavigatorConfig[AUTH_SCREEN_NAME] = {
  screen: AuthentificationScreen,
};

stackNavigatorConfig[HOME_SCREEN_NAME] = {
  screen: HomeScreen,
};

stackNavigatorConfig[LOGIN_SCREEN_NAME] = {
  screen: LoginScreen,
};

stackNavigatorConfig[PHONEBOOKDETAIL_SCREEN_NAME] = {
  screen: PhoneBookDetailScreen,
};

stackNavigatorConfig[PHONEBOOKLIST_SCREEN_NAME] = {
  screen: PhoneBookListScreen,
};

stackNavigatorConfig[FORGOTTENPASSWORD_SCREEN_NAME] = {
  screen: ForgottenPasswordScreen,
};

stackNavigatorConfig[ADDCONTACT_SCREEN_NAME] = {
  screen: AddContactScreen,
};

const ApplicationNavigator = StackNavigator(stackNavigatorConfig, {
  initialRouteName: LOGIN_SCREEN_NAME,
});

export default () => <ApplicationNavigator />;
