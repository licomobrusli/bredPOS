import React from 'react';
import MainScreen from './src/components/MainScreen';
import ServiceCategoryList from './src/screens/ServiceCategoryList';

function App(): JSX.Element {
  return (
    <MainScreen
      MainContent={<ServiceCategoryList />}
      // ... other props for side menu, branding ribbon, and cart summary
    />
  );
}

export default App;
