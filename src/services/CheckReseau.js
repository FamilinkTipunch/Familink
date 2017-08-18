import { NetInfo } from 'react-native';
import { Component } from 'react';

export default class CheckReseau extends Component {
  static getInitialState() {
    return {
      isConnected: null,
    };
  }

  static isConnected() {
    let appIsConnected = false;
    return NetInfo.isConnected.fetch().then(
      (isConnected) => {
        if (isConnected) {
          appIsConnected = true;
        }
        return appIsConnected;
      });
  }
}
