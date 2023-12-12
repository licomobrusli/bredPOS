// MARKED FOR DELETION
// IS redundant
import React from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { ModalCount } from '../config/types';
import styles from '../config/fonts';
import SDims from '../config/dimensions';

interface ThemeListItemProps {
  modalCount: ModalCount;
  isSelected: boolean;
  calculatedPrice?: number;
  onPress: () => void;
}

const ThemeListItem: React.FC<ThemeListItemProps> = ({
  modalCount,
  isSelected,
  calculatedPrice,
  onPress,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isSelected ? 'red' : 'black',
          alignSelf: 'center',
          width: screenWidth * 0.55,
          marginVertical: SDims.D5px,
          borderColor: 'red',
          borderWidth: SDims.D2px,
        }}
      >
        <Text
          style={[
            styles.txtButtonA,
            {
              flex: 4.2,
              textAlign: 'left',
              paddingLeft: SDims.D10px,
            },
          ]}
        >
          {modalCount.name.toUpperCase()}
        </Text>
        <Text
          style={[
            styles.txtButtonA,
            {
              flex: 1,
              textAlign: 'right',
              paddingRight: SDims.D10px,
            },
          ]}
        >
          {calculatedPrice !== undefined ? `${calculatedPrice}€` : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeListItem;
