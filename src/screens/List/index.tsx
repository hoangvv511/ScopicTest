import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import DataInputModal from 'components/DataInputModal';
import SCHeader, {SCHeaderButton} from 'components/SCHeader';
import {useAuth} from 'contexts/AuthContext';
import {ListDataProvider, useListData} from 'contexts/ListDataContext';
import {formatTextItem} from 'helpers';
import {
  Box,
  Fab,
  HStack,
  Icon,
  Pressable,
  Switch,
  Text,
  useToast,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5Pro';
import Item from './Item';

const List = () => {
  const {isFirstLogin} = useAuth();
  const {listData, setListData, isFirebase, setIsFirebase} = useListData();
  const toast = useToast();
  const navigation = useNavigation<NavigationProp<any>>();
  const isFocused = useIsFocused();

  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isShowFab, setIsShowFab] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsShowFab(true);
    } else {
      setIsShowFab(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFirebase) {
      toast.show({
        title: 'Use firebase list',
        status: 'info',
        duration: 2000,
      });
    } else {
      toast.show({
        title: 'Use storage list',
        status: 'info',
        duration: 2000,
      });
    }
  }, [isFirebase]);

  const _goToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const _toggleSwitch = useCallback(() => {
    setIsFirebase(!isFirebase);
  }, [isFirebase]);

  const _handleSaveItem = useCallback(
    (text: string) => {
      setIsInputVisible(false);
      const newList = [...listData, formatTextItem(text)];
      setListData(newList);
    },
    [listData],
  );

  const _handleRemoveItem = useCallback(
    (text: string) => {
      const newList = [...listData.filter(x => x !== text)];

      setListData(newList);
    },
    [listData],
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const _renderItem = ({item, index}: any) => {
    return <Item text={item} />;
  };

  const _renderHiddenItem = ({item, index}, rowMap) => (
    <HStack flex="1" pl="2" bgColor={'red.500'} justifyContent={'flex-end'}>
      <Pressable
        w="70"
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => {
          closeRow(rowMap, index);
          setTimeout(() => {
            _handleRemoveItem(item);
          }, 200);
        }}
        _pressed={{
          opacity: 0.5,
        }}>
        <VStack alignItems="center" space={2}>
          <Icon
            as={<FontAwesome5Icon name="trash-alt" />}
            color="white"
            size="xs"
          />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box flex={1} bgColor={'white'}>
      <SCHeader
        title="List"
        back={isFirstLogin}
        right={<SCHeaderButton title="Profile" onPress={_goToProfile} />}
      />
      <HStack mt={4} space={2} justifyContent={'center'}>
        <Switch
          isChecked={isFirebase}
          onToggle={_toggleSwitch}
          colorScheme="green"
          size={'lg'}
        />
      </HStack>
      <SwipeListView
        style={{marginTop: 50}}
        disableRightSwipe
        data={listData}
        renderItem={_renderItem}
        renderHiddenItem={_renderHiddenItem}
        rightOpenValue={-70}
        stopRightSwipe={-70}
        useNativeDriver={false}
        keyExtractor={(_, index) => index.toString()}
      />
      {isShowFab && (
        <Fab
          placement="bottom-right"
          size={'md'}
          icon={
            <Icon color="white" as={<FontAwesome5Icon name="plus" />} pl={1} />
          }
          bgColor={'red.500'}
          bottom={40}
          onPress={() => setIsInputVisible(true)}
        />
      )}
      <DataInputModal
        isOpen={isInputVisible}
        onClose={() => setIsInputVisible(false)}
        onSave={_handleSaveItem}
      />
    </Box>
  );
};

const ListContainer = () => {
  return (
    <ListDataProvider>
      <List />
    </ListDataProvider>
  );
};

export default ListContainer;
