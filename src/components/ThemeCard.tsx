// ThemeCard.tsx
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/fonts'; // Make sure to import your custom styles

interface ThemeCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: any;
  serviceName?: string;  // New optional prop for service name
  categoryName?: string;  // New optional prop for category name
  onPress: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ style, imageUrl, serviceName, categoryName, onPress }) => {
  // Determine if the imageUrl is a local image or a remote URL
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  const displayText = serviceName?.toUpperCase() || categoryName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={customStyles.txtProductCard}>{displayText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
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
