import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Button, Center, Heading} from 'native-base';
import React, {useCallback, useEffect} from 'react';
import {firebaseService} from 'services/firebaseService';
import {localStorageService} from 'services/localStorageService';

const Welcome = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {}, []);

  const _handleFirstLogin = useCallback(async () => {
    const isFirstLogin = await localStorageService.isFirstLogin();
    const user = firebaseService.getCurrentUser();

    if (isFirstLogin) {
      localStorageService.setFirstLogin(user?.email);
    }
  }, []);

  const _goToList = useCallback(() => {
    _handleFirstLogin();
    navigation.navigate('List');
  }, []);

  return (
    <Center
      flex={1}
      bgColor={'white'}
      justifyContent={'space-between'}
      paddingTop={50}
      paddingBottom={12}>
      <Heading size="lg" fontWeight="bold" color="coolGray.800">
        Welcome
      </Heading>
      <Heading size="md" fontWeight="medium" color="gray.400">
        Hi there! Nice to see you
      </Heading>
      <Button
        colorScheme="error"
        marginTop={5}
        width={'75%'}
        height={45}
        onPress={_goToList}>
        List
      </Button>
    </Center>
  );
};

export default Welcome;
