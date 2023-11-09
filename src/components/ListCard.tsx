// ListCard.tsx
import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';

interface ListCardProps {
  style?: StyleProp<ViewStyle>;
  imageUrl: string;
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ style, imageUrl, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
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
