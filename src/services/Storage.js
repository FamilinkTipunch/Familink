import { AsyncStorage } from 'react-native';

// KEY
// @Token:key
// @Contact:key
// @RememberMe:key
// @Phone:key

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
      const value = await AsyncStorage.getItem(key);
      console.log(value);
      return value;
    } catch (error) {
      return -1;
    }
  }

  static async removeData(key, data) {
    try {
      const value = await AsyncStorage.removeItem(key, data);
      return value;
    } catch (error) {
      return -1;
    }
  }
}
