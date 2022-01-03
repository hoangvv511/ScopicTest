import {Box, Divider, Text, VStack} from 'native-base';
import React, {FC, memo} from 'react';

const Item: FC<{text: string}> = props => {
  const {text} = props;

  return (
    <Box height={50} bgColor={'white'}>
      <VStack height={49} pl={4} pr={4} justifyContent={'center'}>
        <Text fontSize={'md'} fontWeight={'bold'}>
          {text}
        </Text>
      </VStack>
      <Divider ml={4} height={0.5} />
    </Box>
  );
};

export default memo(Item);
