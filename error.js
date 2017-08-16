/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var loginError = "le mot de passe ou l'identifiant est incorrect";
var passwordForgottenError = "l'identifiant fournit est incorrect";
var tokenError = "la session a expiré";
var pageNotFoundError = "404 error";
var serverError = "le serveur est injoignable"

export default class ErrorHandler extends Component {
  
}

AppRegistry.registerComponent('FamilinkTipunch', () => FamilinkTipunch);
