import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getCurrentUser = () => firebase.auth().currentUser;

export const getListItem = () => {
  return firestore().collection('Users').doc(getCurrentUser()?.uid).get();
};

export const updateListItem = (list: string[]) => {
  return firestore()
    .collection('Users')
    .doc(getCurrentUser()?.uid)
    .set({notes: list});
};

export const firebaseService = {
  getCurrentUser,
  getListItem,
  updateListItem,
};
