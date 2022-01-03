import {Button, FormControl, Input, Modal} from 'native-base';
import React, {FC, useEffect, useState} from 'react';

interface DataInputModalProps {
  isOpen: boolean;
  onSave: (text: string) => void;
  onClose: () => void;
}

const DataInputModal: FC<DataInputModalProps> = props => {
  const {isOpen, onSave, onClose} = props;
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setText('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Content maxWidth="400px" bgColor={'white'}>
        <Modal.Body>
          <FormControl>
            <FormControl.Label _text={{color: 'red.500', fontWeight: 'bold'}}>
              Add new item
            </FormControl.Label>
            <Input
              placeholder="Enter your note"
              value={text}
              onChangeText={setText}
              fontSize={'sm'}
              fontWeight={500}
              maxLength={40}
              numberOfLines={1}
            />
            <FormControl.HelperText
              alignItems={
                'flex-end'
              }>{`${text.length}/40`}</FormControl.HelperText>
          </FormControl>
        </Modal.Body>
        <Modal.Footer bgColor={'white'}>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={'red'}
              onPress={() => {
                onSave && onSave(text);
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DataInputModal;
