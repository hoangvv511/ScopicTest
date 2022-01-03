import {LoadingProvider} from 'contexts/LoadingContext';
import {NativeBaseProvider, StatusBar} from 'native-base';
import React from 'react';
import Root from './Root';

const App = () => {
  return (
    <NativeBaseProvider>
      <LoadingProvider>
        <Root />
      </LoadingProvider>
    </NativeBaseProvider>
  );
};

export default App;
