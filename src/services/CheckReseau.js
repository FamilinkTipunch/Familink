// import React from 'react';

import { NetInfo } from 'react-native';

export default function checkReseau() {
  NetInfo.isConnected.fetch().then((isConnected) => {
    console.log('App, is ' + (isConnected ? 'online' : 'offline'));
  });
}
