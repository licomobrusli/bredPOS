import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';

interface ButtonAProps {
  title: string;
  onPress: () => void;
}

interface listButtonProps {
  name: string;
  price: string;
  onPress?: () => void;
  style?: object;
}

const styles = StyleSheet.create({
  // button styles
  buttonA: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#AD8457',
    borderRadius: 10,
  },
  ListButton: {
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#AD8457',
    borderRadius: 10,
    // update these styles
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: SDims.Width50p + SDims.Width5p,
  },
  
  // button text styles
  buttonAText: {
    ...fonts.txtButtonA,
  },
  listButtonText: {
    ...fonts.txtList,
  },

  name: {
    flex: 4.2,
    textAlign: 'left',
    paddingLeft: 10,
  },
  price: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10,
  },

});

const ButtonA: FC<ButtonAProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonA} onPress={onPress}>
      <Text style={styles.buttonAText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ListButton: FC<listButtonProps> = ({ name, price, onPress = () => {}, style }) => {
  return (
    <TouchableOpacity style={[styles.ListButton, style]} onPress={onPress}>
      <Text style={[styles.listButtonText, styles.name]}>{name}</Text>
      <Text style={[styles.listButtonText, styles.price]}>{price}</Text>
    </TouchableOpacity>
  );
};

const Buttons = {
  ButtonA,
  ListButton,
};

export default Buttons;
