import { AsyncStorage } from 'react-native';

// KEY
// @Token:key
// @Contact:key
// @RememberMe:key
// @Phone:key
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
      const value = await AsyncStorage.getItem(key);
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
