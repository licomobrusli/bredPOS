// ThemeCard.tsx
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/fonts'; // Make sure to import your custom styles

interface ThemeCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: any;
  serviceName?: string;
  onPress: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ style, imageUrl, serviceName, onPress }) => {
  // Determine if the imageUrl is a local image or a remote URL
  console.log(`Service Name: ${serviceName}`);
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  const displayText = serviceName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={customStyles.txtButtonA}>{displayText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#AD8457',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '66%', // Adjust the height as needed
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  categoryText: {
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});

export default ThemeCard;
