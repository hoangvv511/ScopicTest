import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useLoading} from 'contexts/LoadingContext';
import {useToast} from 'native-base';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {localStorageService} from 'services/localStorageService';

type AuthParam = {
  email: string;
  password: string;
};

const AuthContext = createContext<{
  signIn: any;
  signOut: any;
  signUp: any;
  user: FirebaseAuthTypes.User | null;
  isFirstLogin: boolean | null;
}>({
  user: null,
  isFirstLogin: false,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
});

export const AuthProvider = ({children}: any) => {
  const {setIsLoading, setLoadingMessage} = useLoading();
  const toast = useToast();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState<any>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);

    if (initializing) setInitializing(false);
  };

  const _getLoginState = () => {
    localStorageService.isFirstLogin().then(value => setIsFirstLogin(value));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    _getLoginState();

    return subscriber;
  }, []);

  if (initializing) return null;

  const _signIn = ({email, password}: AuthParam) => {
    setLoadingMessage('Wait a Moment');
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setIsLoading(false);
        toast.show({
          title: `Welcome ${res.user.email}`,
          status: 'success',
          duration: 2000,
        });
      })
      .catch(error => {
        setIsLoading(false);
        toast.show({
          title: 'Wrong email or password!',
          status: 'error',
          duration: 2000,
        });
      });
  };

  const _signUp = ({email, password}: AuthParam) => {
    setLoadingMessage('Wait a Moment');
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        setIsLoading(false);
        toast.show({
          title: `Welcome ${res.user.email}`,
          status: 'success',
          duration: 2000,
        });
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          toast.show({
            title: 'Email is already in use!',
            status: 'error',
            duration: 2000,
          });
          return;
        }
        if (error.code === 'auth/invalid-email') {
          toast.show({
            title: 'Email is invalid!',
            status: 'error',
            duration: 2000,
          });
          return;
        }
        toast.show({
          title: 'Something went wrong!',
          status: 'error',
          duration: 2000,
        });

        console.log(error);
      });
  };

  const _signOut = () => {
    setLoadingMessage('Logging out');
    setIsLoading(true);
    auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isFirstLogin,
        user,
        signIn: _signIn,
        signOut: _signOut,
        signUp: _signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
