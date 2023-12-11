// ListCard.tsx
import React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/fonts';

interface ListCardProps {
  style?: ViewStyle;
  imageUrl: string | { uri: string };
  categoryName?: string;
  serviceName?: string;
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ style, imageUrl, categoryName, serviceName, onPress }) => {
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  const displayText = serviceName?.toUpperCase() || categoryName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image source={imageSource} style={styles.image} />
      <Text style={customStyles.txtCard}>{displayText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#AD8457',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '66%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 33,
    marginBottom: 33,
  },
  categoryText: {
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});

export default ListCard;
