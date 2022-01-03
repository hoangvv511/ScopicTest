import {firebaseService} from './firebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const IS_FIRST_LOGIN_KEY = 'isFirstLogin';
export const USER_KEY = 'user';

export const isFirstLogin = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(IS_FIRST_LOGIN_KEY);

    if (!jsonValue) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(`Error when getting first login`, e);
  }
};

export const setFirstLogin = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(IS_FIRST_LOGIN_KEY, jsonValue);
  } catch (e) {
    console.log(`Error when set first login`, e);
  }
};

export const getCurrentListItem = async () => {
  const user = firebaseService.getCurrentUser();
  try {
    const jsonValue = (await AsyncStorage.getItem(user?.uid || '')) ?? '';

    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(`Error when get local list`, e);
  }
};

export const updateListItem = async (list: string[]) => {
  const user = firebaseService.getCurrentUser();
  try {
    const jsonValue = JSON.stringify(list);

    await AsyncStorage.setItem(user?.uid || '', jsonValue);
  } catch (e) {
    console.log(`Error when update local list`, e);
  }
};

export const localStorageService = {
  isFirstLogin,
  setFirstLogin,
  getCurrentListItem,
  updateListItem,
};
