// ListCard.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import customStyles from '../config/fonts';
import { cardGridStyle } from '../config/cardGridStyle';
import SDims from '../config/dimensions';
import { tickTeal } from '../main/assets/images';  // Import tickTeal image

interface ListCardProps {
  imageUrl: string | { uri: string };
  serviceName?: string;
  categoryName?: string;
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
  const displayText = serviceName?.toUpperCase() || categoryName?.toUpperCase() || 'N/A';

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Wrapper view to apply opacity */}
      <View style={isInCartForCurrentCategory ? styles.dimmedWrapper : null}>
        <Image source={imageSource} style={styles.image} />
        <Text style={customStyles.txtCard}>{displayText}</Text>
      </View>
      {/* Conditionally render the teal tick image outside the dimmed wrapper */}
      {isInCartForCurrentCategory && (
        <View style={styles.tickContainer}>
          <Image source={tickTeal} style={styles.tickImage} />
        </View>
      )}
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
    position: 'relative',  // Ensure the absolute positioning of tick is relative to the card
  },
  dimmedWrapper: {
    opacity: 0.4,  // Apply reduced opacity to the wrapper
  },
  image: {
    width: '100%',
    height: '66%',
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: SDims.Width2dot5p,
    marginBottom: SDims.Width2dot5p,
  },
  tickContainer: {
    position: 'absolute',  // Overlay the tick on top of the card
    top: 2,
    right: 4,
  },
  tickImage: {
    width: 350,  // Adjust the size as needed
    height: 350,  // Adjust the size as needed
    resizeMode: 'contain',
  },
});

export default ListCard;
