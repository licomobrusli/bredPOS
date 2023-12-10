import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from '../config/fonts';
import SDims from '../config/dimensions';

// Define color constants
// this should eventually be moved to a config file
const COLOR_A = '#AD8457';
const COLOR_B = 'black';

interface ButtonAProps {
  title: string;
  onPress: () => void;
}

interface ButtonBProps {
  title: string;
  onPress: () => void;
  color: 'A' | 'B';
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
    borderColor: '#AD8457', 
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonB: {
    flexDirection: 'column',
    padding: 12,
    borderColor: '#AD8457', 
    borderWidth: 2,
    borderRadius: 10, 
    height: SDims.Height10p,
    width: SDims.Width1_4f,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListButton: {
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#AD8457',
    borderColor: '#AD8457',
    borderWidth: 2,
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
  buttonBText: {
    ...fonts.txtCard,
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

const ButtonB: FC<ButtonBProps> = ({ title, onPress, color }) => {
  const backgroundColor = color === 'A' ? COLOR_A : COLOR_B;
  return (
    <TouchableOpacity style={[styles.buttonB, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonBText}>{title}</Text>
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
  ButtonB,
  ListButton,
};

export default Buttons;
