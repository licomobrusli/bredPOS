// McentralSection.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MlistSection from './MlistSection';
import McentralControlsSection from './McentralControlsSection';
import MadvertSection from './MadvertSection';
import SDims from '../config/dimensions';
import customStyles from '../config/fonts';

const McentralSection: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute();  // Using useRoute to get the current route

  let centralText = "Central Section";  // Default text

  if (route.name === 'CategoryScreen') {
    centralText = "Seleccione una categoría";
  } else if (route.name === 'ServiceScreen') {
    // Accessing the route parameters to get the selected category name
    const { category } = route.params as { category: { name: string } };
    centralText = `Servicios de ${category.name}`;
  }

  return (
    <View style={{ 
      height: SDims.HeightCentralSection,
      alignSelf: 'center',
      alignContent: 'center',
      backgroundColor: 'black',
      flexDirection: 'column' }}>
      <View style={{ 
        flexDirection: 'column',
        height: SDims.HeightCentralSection * .075,
        width: SDims.Width90p,
        alignSelf: 'center',
        justifyContent: 'flex-end',
         }}>
        <Text style={[customStyles.txtBanner]}>{centralText}</Text>
      </View>
      <View style={{ height: SDims.HeightCentralSection * .5 }}>
        <MlistSection navigation={navigation} />
      </View>
      <View style={{ height: SDims.HeightCentralSection * .25, backgroundColor: 'black' }}>
        <MadvertSection />
      </View>
      <View style={{  height: SDims.HeightCentralSection * .25, backgroundColor: 'black' }}>
        <McentralControlsSection />
      </View>
    </View>
  );
};

export default McentralSection;
