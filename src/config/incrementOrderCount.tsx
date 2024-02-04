// incrementOrderCount.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_COUNTER_KEY = 'orderCounter';
const LAST_ORDER_DATE_KEY = 'lastOrderDate';

// Function to get the current order count
const getOrderCounter = async () => {
  const lastOrderDate = await AsyncStorage.getItem(LAST_ORDER_DATE_KEY);
  const currentDate = new Date().toDateString();

  if (lastOrderDate === currentDate) {
    const counter = await AsyncStorage.getItem(ORDER_COUNTER_KEY);
    return counter ? parseInt(counter, 10) : 0;
  } else {
    await AsyncStorage.setItem(LAST_ORDER_DATE_KEY, currentDate);
    await AsyncStorage.setItem(ORDER_COUNTER_KEY, '0');
    return 0;
  }
};

// Function to increment the order counter
export const incrementOrderCounter = async () => {
  const counter = await getOrderCounter();
  const newCounter = counter + 1;
  await AsyncStorage.setItem(ORDER_COUNTER_KEY, newCounter.toString());
};
