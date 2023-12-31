// ListCard.tsx
import React from 'react';
import { StyleSheet, ViewStyle, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/fonts';
import { cardGridStyle } from '../config/cardGridStyle'; // Import cardGridStyle for common styling
import SDims from '../config/dimensions';

interface ListCardProps {
  imageUrl: string | { uri: string };
  categoryName?: string;
  serviceName?: string;
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ imageUrl, categoryName, serviceName, onPress }) => {
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  const displayText = serviceName?.toUpperCase() || categoryName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <Text style={customStyles.txtCard}>{displayText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#AD8457',
    borderWidth: SDims.D2px,
    borderRadius: SDims.D5px,
    marginHorizontal: cardGridStyle.margin * 0.5,
    marginTop: cardGridStyle.margin * 0.5,
    width: cardGridStyle.imageWidth,
    height: cardGridStyle.imageHeight * 1.5,
  },
  image: {
    width: '100%',
    height: '66%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: SDims.Width2dot5p,
    marginBottom: SDims.Width2dot5p,
  },
});

export default ListCard;
