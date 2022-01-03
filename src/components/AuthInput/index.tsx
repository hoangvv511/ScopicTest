import {IInputProps, Input} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

interface AuthInputProps extends IInputProps {
  useSecurePassword?: boolean;
}

const AuthInput: FC<AuthInputProps> = props => {
  const {useSecurePassword, ...restProps} = props;

  const [isSecurePassword, setIsSecurePassword] = useState(useSecurePassword);

  const _changeSecurePassword = useCallback(() => {
    setIsSecurePassword(isSecure => !isSecure);
  }, []);

  return (
    <Input
      selectionColor={'blue.500'}
      _focus={{
        borderBottomColor: 'blue.500',
      }}
      variant="underlined"
      fontSize={'sm'}
      fontWeight={500}
      style={{
        marginTop: -8,
        paddingLeft: -10,
        paddingBottom: 5,
      }}
      secureTextEntry={useSecurePassword && isSecurePassword}
      InputRightElement={
        useSecurePassword ? (
          <FontAwesome5Pro
            name={!isSecurePassword ? 'eye' : 'eye-slash'}
            solid
            size={18}
            color={'#d4d4d8'}
            onPress={_changeSecurePassword}
          />
        ) : undefined
      }
      {...restProps}
    />
  );
};

export default AuthInput;
