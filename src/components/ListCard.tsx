// ListCard.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import customStyles from '../config/fonts';
import { cardGridStyle } from '../config/cardGridStyle';
import SDims from '../config/dimensions';

interface ListCardProps {
  imageUrl: string | { uri: string };
  serviceName?: string;
  categoryName?: string; // Accept categoryName prop
  onPress: () => void;
  isInCartForCurrentCategory?: boolean;
}

const ListCard: React.FC<ListCardProps> = ({
  imageUrl,
  serviceName,
  categoryName,
  onPress,
  isInCartForCurrentCategory,
}) => {
  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
  // Determine display text based on serviceName or categoryName
  const displayText = serviceName?.toUpperCase() || categoryName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        isInCartForCurrentCategory ? styles.dimmedCard : {}, // Apply dimmed style conditionally to the entire card
      ]}
    >
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
    // Removed opacity from the image
  },
  image: {
    width: '100%',
    height: '66%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: SDims.Width2dot5p,
    marginBottom: SDims.Width2dot5p,
  },
  dimmedCard: {
    opacity: 0.4, // Apply reduced opacity to the entire card
  },
});

export default ListCard;
