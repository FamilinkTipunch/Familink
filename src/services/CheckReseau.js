import { NetInfo } from 'react-native';

export default function checkReseau() {
  NetInfo.isConnected.fetch().then(
    (isConnected) => {
      if (isConnected) {
        //on se connectera a l'api
      } else {
        //sinon base de donnée
      }
    });
}
