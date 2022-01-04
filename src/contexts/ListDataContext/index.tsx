import firestore from '@react-native-firebase/firestore';
import {useLoading} from 'contexts/LoadingContext';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {firebaseService} from 'services/firebaseService';
import {localStorageService} from 'services/localStorageService';

const ListDataContext = createContext<{
  listData: any[];
  setListData: any;
  isFirebase: boolean;
  setIsFirebase: any;
}>({
  isFirebase: true,
  setIsFirebase: () => {},
  listData: [],
  setListData: () => {},
});

export const ListDataProvider = ({children}: any) => {
  const [isFirebase, setIsFirebase] = useState(true);
  const {setIsLoading, setLoadingMessage} = useLoading();
  const [storageList, setStorageList] = useState<string[]>([]);
  const [firebaseList, setFirebaseList] = useState<string[]>([]);

  const listData = useMemo(() => {
    return isFirebase ? firebaseList : storageList;
  }, [isFirebase, storageList, firebaseList]);

  useEffect(() => {
    const user = firebaseService.getCurrentUser();
    const subscriber = firestore()
      .collection('Users')
      .doc(user?.uid)
      .onSnapshot((documentSnapshot: any) => {
        if (documentSnapshot?.exists) {
          setFirebaseList(documentSnapshot?.data().notes);
        }
      });

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (isFirebase) {
      _getFirebaseList();
    } else {
      _getStorageList();
    }
  }, [isFirebase]);

  const _setListData = (list: string[]) => {
    if (isFirebase) {
      _updateFirebaseList(list);
    } else {
      _updateStorageList(list);
    }
  };
  const _getFirebaseList = () => {
    firebaseService.getListItem().then((documentSnapshot: any) => {
      if (documentSnapshot?.exists) {
        setFirebaseList(documentSnapshot?.data().notes);
      }
    });
  };

  const _updateFirebaseList = (list: string[]) => {
    setLoadingMessage('Loading');
    setIsLoading(true);
    firebaseService
      .updateListItem(list)
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const _getStorageList = async () => {
    const list = await localStorageService.getCurrentListItem();
    setStorageList(list);
  };

  const _updateStorageList = (list: string[]) => {
    setLoadingMessage('Loading');
    setIsLoading(true);

    localStorageService
      .updateListItem(list)
      .then(() => {
        setIsLoading(false);
        _getStorageList();
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  return (
    <ListDataContext.Provider
      value={{
        listData,
        setListData: _setListData,
        isFirebase,
        setIsFirebase,
      }}>
      {children}
    </ListDataContext.Provider>
  );
};

export const useListData = () => useContext(ListDataContext);
