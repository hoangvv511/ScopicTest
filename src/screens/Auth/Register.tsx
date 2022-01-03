import AuthInput from 'components/AuthInput';
import {useAuth} from 'contexts/AuthContext';
import {isValidEmail} from 'helpers';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AuthScreenType} from 'screens/Auth';

interface RegisterProps {
  setAuthScreen: (screen: AuthScreenType) => void;
}

const Register: FC<RegisterProps> = props => {
  const {setAuthScreen} = props;
  const {signUp} = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleSignUp = useCallback(() => {
    if (!email.length || !password.length) {
      toast.show({
        title: 'Email and password cannot be blank',
        status: 'error',
        duration: 2000,
      });
      return;
    } else if (!isValidEmail(email)) {
      toast.show({
        title: 'Email is invalid',
        status: 'error',
        duration: 2000,
      });
      return;
    } else if (password.length < 6) {
      toast.show({
        title: 'Password should be at least 6 characters',
        status: 'error',
        duration: 2000,
      });
      return;
    }

    signUp({email, password});
  }, [email, password]);

  const _goToLogin = useCallback(() => {
    setAuthScreen && setAuthScreen('Login');
  }, []);

  return (
    <Box flex={1} paddingTop={5} paddingLeft={10} paddingRight={10}>
      <Heading size="lg" fontWeight="bold" color="coolGray.800">
        Sign Up
      </Heading>
      <VStack space={3} mt="10">
        <FormControl>
          <FormControl.Label _text={{color: 'red.500', fontWeight: 'bold'}}>
            Email
          </FormControl.Label>
          <AuthInput
            placeholder="Your email address"
            value={email}
            onChangeText={setEmail}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label _text={{color: 'red.500', fontWeight: 'bold'}}>
            Password
          </FormControl.Label>
          <AuthInput
            type="password"
            placeholder="Your password"
            value={password}
            onChangeText={setPassword}
          />
        </FormControl>
        <Button
          colorScheme="error"
          marginTop={90}
          height={45}
          onPress={_handleSignUp}>
          Sign Up
        </Button>
      </VStack>

      <HStack justifyContent="center" marginTop={6}>
        <Text color={'gray.400'} fontWeight={'bold'} paddingRight={1}>
          Have an account?
        </Text>
        <TouchableOpacity onPress={_goToLogin}>
          <Text color={'red.500'} fontWeight={'bold'}>
            Sign In
          </Text>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default Register;
