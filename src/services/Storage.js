import { AsyncStorage } from 'react-native';

// KEY
// @Token:key
// @Contact:key
// @RememberMe:key
// @Phone:key
// @CurrentPhone:key
// @FirstName:key
// @LastName:key
// @Email:key
// @Profil:key

export default class Storage {
  static async setData(key, data) {
    try {
      await AsyncStorage.setItem(key, data);
      return 1;
    } catch (error) {
      return -1;
    }
  }

  static async getData(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      return -1;
    }
  }

  static async removeData(key, data) {
    try {
      await AsyncStorage.getItem(key, data);
      return 1;
    } catch (error) {
      return -1;
    }
  }
  static async pushData(key, data) {
    try {
      await AsyncStorage.push(key, data);
      return 1;
    } catch (error) {
      return -1;
    }
  }
}
