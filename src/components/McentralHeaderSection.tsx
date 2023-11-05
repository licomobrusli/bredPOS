import React from 'react';
import { View } from 'react-native';

interface McentralHeaderProps {
  children: JSX.Element | JSX.Element[];
}

const McentralHeader: React.FC<McentralHeaderProps> = ({ children }) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'lightsalmon',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 5,
      }}>
      {children}
    </View>
  );
};

export default McentralHeader;
