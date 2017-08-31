import React from 'react';

import { StackNavigator, NavigationActions } from 'react-navigation';

import AuthentificationScreen, { AUTH_SCREEN_NAME } from '../screen/AuthentificationScreen';
import HomeScreen, { HOME_SCREEN_NAME } from '../screen/HomeScreen';
import LoginScreen, { LOGIN_SCREEN_NAME } from '../screen/LoginScreen';
import PhoneBookDetailScreen, { PHONEBOOKDETAIL_SCREEN_NAME } from '../screen/PhoneBookDetailScreen';
import PhoneBookListScreen, { PHONEBOOKLIST_SCREEN_NAME } from '../screen/PhoneBookListScreen';
import ForgottenPasswordScreen, { FORGOTTENPASSWORD_SCREEN_NAME } from '../screen/ForgottenPasswordScreen';
import AddContactScreen, { ADDCONTACT_SCREEN_NAME } from '../screen/AddContactScreen';
import PhoneBookModifyScreen, { MODIFCONTACT_SCREEN_NAME } from '../screen/PhoneBookModifyScreen';
import ProfilScreen, { PROFIL_SCREEN_NAME } from '../screen/ProfilScreen';

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

stackNavigatorConfig[PROFIL_SCREEN_NAME] = {
  screen: ProfilScreen,
};

stackNavigatorConfig[FORGOTTENPASSWORD_SCREEN_NAME] = {
  screen: ForgottenPasswordScreen,
};

stackNavigatorConfig[ADDCONTACT_SCREEN_NAME] = {
  screen: AddContactScreen,
};

stackNavigatorConfig[MODIFCONTACT_SCREEN_NAME] = {
  screen: PhoneBookModifyScreen,
};

const ApplicationNavigator = StackNavigator(stackNavigatorConfig, {
  initialRouteName: LOGIN_SCREEN_NAME,
});

const navigateOnce = getStateForAction => (action, state) => {
  const { type, routeName } = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};

ApplicationNavigator.router.getStateForAction =
navigateOnce(ApplicationNavigator.router.getStateForAction);

export default () => <ApplicationNavigator />;
