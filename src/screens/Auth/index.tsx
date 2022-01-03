import {Box} from 'native-base';
import React, {useCallback, useState} from 'react';
import {LayoutAnimation} from 'react-native';
import Login from './Login';
import Register from './Register';

export type AuthScreenType = 'Login' | 'Register';

const Auth = () => {
  const [screen, setScreen] = useState<AuthScreenType>('Login');

  const _selectScreen = (screen: AuthScreenType) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setScreen(screen);
  };

  const _renderScreen = () => {
    switch (screen) {
      case 'Login':
        return <Login setAuthScreen={_selectScreen} />;
      case 'Register':
        return <Register setAuthScreen={_selectScreen} />;
      default:
        return <Login setAuthScreen={_selectScreen} />;
    }
  };

  return (
    <Box flex={1} bgColor={'white'}>
      {_renderScreen()}
    </Box>
  );
};

export default Auth;
