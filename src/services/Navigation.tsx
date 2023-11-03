// Navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceCategoryList from '../screens/ServiceCategoryList';
import ServiceList from '../screens/ServiceList';

export type RootStackParamList = {
  ServiceCategoryList: undefined;
  ServiceList: { categoryId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ServiceCategoryList">
      <Stack.Screen name="ServiceCategoryList" component={ServiceCategoryList} />
      <Stack.Screen name="ServiceList" component={ServiceList} />
    </Stack.Navigator>
  );
};

export default Navigation;
