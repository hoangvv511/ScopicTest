import {StatusBar} from 'native-base';
import RootContainer from 'navigation';
import React, {useEffect} from 'react';
import {Platform, UIManager} from 'react-native';

const Root = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <RootContainer />
    </>
  );
};

export default Root;
