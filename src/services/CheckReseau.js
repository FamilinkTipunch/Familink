import { NetInfo } from 'react-native';

export default function CheckReseau() {
  let appIsConnected = false;
  return NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      appIsConnected = true;
      return appIsConnected;
    }
    return appIsConnected;
  });
}
