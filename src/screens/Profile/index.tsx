import SCHeader from 'components/SCHeader';
import {useAuth} from 'contexts/AuthContext';
import {Box, Button, Center, Text} from 'native-base';
import React, {useCallback, useMemo} from 'react';
import {firebaseService} from 'services/firebaseService';

const Profile = () => {
  const {signOut} = useAuth();

  const user = useMemo(() => {
    return firebaseService.getCurrentUser();
  }, []);

  const _handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <Box flex={1} bgColor={'white'}>
      <SCHeader title="Profile" back />
      <Center
        flex={1}
        justifyContent={'space-between'}
        paddingTop={50}
        paddingBottom={12}>
        <Text fontSize={'md'} fontWeight="bold">
          {user?.email || ''}
        </Text>
        <Button
          colorScheme="error"
          marginTop={5}
          width={'75%'}
          height={45}
          onPress={_handleSignOut}>
          Log Out
        </Button>
      </Center>
    </Box>
  );
};

export default Profile;
