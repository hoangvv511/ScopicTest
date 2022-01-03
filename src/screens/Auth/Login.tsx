import AuthInput from 'components/AuthInput';
import {useAuth} from 'contexts/AuthContext';
import {useLoading} from 'contexts/LoadingContext';
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

interface LoginProps {
  setAuthScreen: (screen: AuthScreenType) => void;
}

const Login: FC<LoginProps> = props => {
  const {setAuthScreen} = props;
  const {signIn} = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _handleSignIn = useCallback(() => {
    if (!email.length || !password.length) {
      toast.show({
        title: 'Email and password cannot be blank',
        status: 'error',
      });
      return;
    }
    signIn({email, password});
  }, [email, password]);

  const _goToRegister = useCallback(() => {
    setAuthScreen && setAuthScreen('Register');
  }, []);

  return (
    <Box flex={1}>
      <Box flex={0.22} justifyContent={'center'} alignItems={'center'}>
        <Heading size="lg" fontWeight="extrabold" color="gray.400">
          Scopic
        </Heading>
      </Box>

      <Box flex={0.63} paddingLeft={8} paddingRight={16}>
        <Heading size="lg" fontWeight="bold" color="coolGray.800">
          Sign In
        </Heading>
        <VStack space={3} mt="16">
          <FormControl>
            <FormControl.Label _text={{color: 'red.500', fontWeight: 'bold'}}>
              Email
            </FormControl.Label>
            <AuthInput
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              useSecurePassword
              value={password}
              onChangeText={setPassword}
            />
          </FormControl>
          <Button
            colorScheme="error"
            marginTop={5}
            height={45}
            onPress={_handleSignIn}>
            Sign In
          </Button>
        </VStack>
      </Box>

      <Box flex={0.15}>
        <HStack justifyContent="flex-end" alignItems={'flex-end'}>
          <TouchableOpacity onPress={_goToRegister}>
            <Text color={'red.500'} fontWeight={'bold'} paddingRight={16}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>
    </Box>
  );
};

export default Login;
