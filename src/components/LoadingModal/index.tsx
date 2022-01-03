import {Heading, Modal, Spinner, VStack} from 'native-base';
import React, {FC} from 'react';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal: FC<LoadingModalProps> = props => {
  const {isOpen, message} = props;

  return (
    <Modal isOpen={isOpen}>
      <Modal.Content width={'150px'} minWidth={'150px'}>
        <VStack
          space={5}
          alignItems={'center'}
          paddingTop={5}
          paddingBottom={5}>
          <Spinner
            color="red.500"
            size="lg"
            accessibilityLabel="Loading posts"
          />
          <Heading color="red.500" fontSize="md">
            {message}
          </Heading>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

export default LoadingModal;
