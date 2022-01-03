import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider, useAuth} from 'contexts/AuthContext';
import React from 'react';
import Auth from 'screens/Auth';
import List from 'screens/List';
import Profile from 'screens/Profile';
import Welcome from 'screens/Welcome';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const {user, isFirstLogin} = useAuth();

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!user ? (
        <RootStack.Screen name="Auth" component={Auth} />
      ) : (
        <>
          {isFirstLogin ? (
            <RootStack.Screen name="Welcome" component={Welcome} />
          ) : null}
          <RootStack.Screen name="List" component={List} />
          <RootStack.Screen name="Profile" component={Profile} />
        </>
      )}
    </RootStack.Navigator>
  );
};

const RootContainer = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default RootContainer;
