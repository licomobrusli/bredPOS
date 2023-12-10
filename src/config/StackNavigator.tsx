// StackNavigator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from '../screens/CategoryScreen';
import ServiceScreen from '../screens/ServiceScreen';
import { Category } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Global background color
  },
});

export type RootStackParamList = {
  CategoryScreen: undefined;
  ServiceScreen: { 
    categoryCode: string;
    category: Category; // Assuming Category is a type you have defined
  };
};

const StackNavigator: React.FC = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CategoryScreen"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: 'black' },
          }}
        >
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default StackNavigator;
