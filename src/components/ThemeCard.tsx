// ThemeCard.tsx
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';

interface ThemeCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: any;
  onPress: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ style, imageUrl, onPress }) => {
  // Determine if the imageUrl is a local image or a remote URL
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image source={imageSource} style={styles.image} />
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
    height: '66%', // Changed to 100% to fill the card
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 33,
    marginBottom: 33,
  },
});

export default ThemeCard;
