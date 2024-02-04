// incrementOrderCount.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_COUNTER_KEY = 'orderCounter';
const LAST_ORDER_DATE_KEY = 'lastOrderDate';

// Function to get the current order count
const getOrderCounter = async () => {
  const lastOrderDate = await AsyncStorage.getItem(LAST_ORDER_DATE_KEY);
  const currentDate = new Date().toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD' format
  
  console.log(`Last order date: ${lastOrderDate}, Current date: ${currentDate}`);

  if (lastOrderDate === currentDate) {
    const counter = await AsyncStorage.getItem(ORDER_COUNTER_KEY);
    console.log(`Fetched counter for current date: ${counter}`);
    return counter ? parseInt(counter, 10) : 0;
  } else {
    console.log('Date has changed. Resetting counter.');
    await AsyncStorage.setItem(LAST_ORDER_DATE_KEY, currentDate);
    await AsyncStorage.setItem(ORDER_COUNTER_KEY, '0');
    return 0;
  }
};

// Function to increment the order counter
export const incrementOrderCounter = async () => {
  const counter = await getOrderCounter();
  const newCounter = counter + 1;
  console.log(`Incrementing counter: ${counter} -> ${newCounter}`);
  await AsyncStorage.setItem(ORDER_COUNTER_KEY, newCounter.toString());
};
