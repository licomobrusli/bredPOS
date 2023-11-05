// StackNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceCategoryList from '../screens/ServiceCategoryList';
import ServiceList from '../screens/ServiceList';

// If you are using TypeScript, you can define the types for your navigation parameters
export type RootStackParamList = {
  ServiceCategoryList: undefined;
  ServiceList: { categoryCode: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ServiceList"
        screenOptions={{
        headerShown: false, // This will apply to all screens within this navigator
        }}
        >
        <Stack.Screen name="ServiceCategoryList" component={ServiceCategoryList} />
        <Stack.Screen name="ServiceList" component={ServiceList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
