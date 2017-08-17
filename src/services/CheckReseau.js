// import React from 'react';

import { NetInfo } from 'react-native';

export default function checkReseau() {
  let AppIsConnected = false;
  NetInfo.isConnected.fetch().then((isConnected) => {
    if (isConnected) {
      AppIsConnected = true;
      return AppIsConnected;
    }
    return AppIsConnected;
  });
}
