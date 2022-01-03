import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Center, HStack, Text} from 'native-base';
import React, {FC, isValidElement} from 'react';
import {TouchableOpacity} from 'react-native';

interface SCHeaderProps {
  title: string;
  back: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const SCHeaderButton: FC<{title: string; onPress: any}> = ({
  title,
  onPress,
}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text color={'red.500'} fontWeight={'bold'} fontSize={'md'}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const SCHeader: FC<SCHeaderProps> = props => {
  const {title, left, right, back} = props;
  const navigation = useNavigation<NavigationProp<any>>();

  const _renderLeft = () => {
    if (back) {
      return (
        <SCHeaderButton title={'Back'} onPress={() => navigation.goBack()} />
      );
    }
    if (isValidElement(left)) return left;
  };

  const _renderCenter = () => {
    return (
      <Text color={'black'} fontWeight={'bold'} fontSize={'md'}>
        {title}
      </Text>
    );
  };

  const _renderRight = () => {
    if (isValidElement(right)) return right;
  };

  return (
    <HStack space={3} height={45} paddingLeft={5} paddingRight={5}>
      <Box flex={0.3} justifyContent={'center'} alignItems={'flex-start'}>
        {_renderLeft()}
      </Box>
      <Center flex={0.4}>{_renderCenter()}</Center>
      <Box flex={0.3} justifyContent={'center'} alignItems={'flex-end'}>
        {_renderRight()}
      </Box>
    </HStack>
  );
};

export default SCHeader;
