import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';

interface ListCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: any; // Accept both string and image module
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ style, imageUrl, onPress }) => {
  // Determine if the imageUrl is a local image or a remote URL
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image
        source={imageSource}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ListCard;
