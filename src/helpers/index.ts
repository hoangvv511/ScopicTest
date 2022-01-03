import _ from 'lodash';
import {StyleSheet} from 'react-native';

export const isValidEmail = (str: string) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return regex.test(str);
};

export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};

export const formatTextItem = (str: string) => {
  let newStr = str.replace(/\s+/g, ' ');

  return _.upperFirst(newStr.trim());
};
