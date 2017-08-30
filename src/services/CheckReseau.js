import { NetInfo } from 'react-native';

let isConnected = null;
export default class CheckReseau {
  static checkConnectivity() {
    NetInfo.isConnected.addEventListener(
      'change',
      (reach) => {
        if (!reach) {
          isConnected = false;
        } else {
          isConnected = true;
        }
      });
    NetInfo.isConnected.fetch().then((reach) => {
      if (!reach) {
        isConnected = false;
      } else {
        isConnected = true;
      }
    });
    return isConnected;
  }
}
