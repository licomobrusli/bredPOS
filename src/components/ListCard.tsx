import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/styles';

interface ListCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: any;
  categoryName?: string;  // Made optional
  serviceName?: string;  // New optional prop for service name
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ style, imageUrl, categoryName, serviceName, onPress }) => {
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
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '66%',
    alignSelf: 'center',
    marginTop: 33,
    marginBottom: 33,
  },
  categoryText: {
    textAlign: 'justify',
    fontWeight: 'bold',
  },
});

export default ListCard;
