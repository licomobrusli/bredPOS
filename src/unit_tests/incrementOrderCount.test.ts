// incrementOrderCount.test.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { incrementOrderCounter } from '../config/incrementOrderCount';
import MockDate from 'mockdate';

// Define the type for the mocked AsyncStorage methods
type MockAsyncStorage = {
  getItem: jest.Mock<Promise<string | null>, [string]>,
  setItem: jest.Mock<Promise<void>, [string, string]>,
};

// Cast the mocked AsyncStorage to the type
const mockedAsyncStorage = AsyncStorage as unknown as MockAsyncStorage;

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

describe('incrementOrderCounter', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockedAsyncStorage.getItem.mockClear();
    mockedAsyncStorage.setItem.mockClear();
  });
  
  it('increments the counter on the same day', async () => {
    MockDate.set(new Date('2023-01-01').toISOString());
    mockedAsyncStorage.getItem.mockImplementation((key: string) => {
      const value = key === 'lastOrderDate' ? '2023-01-01' : key === 'orderCounter' ? '5' : null;
      console.log(`getItem: key=${key}, value=${value}`);
      return Promise.resolve(value);
    });
  
    await incrementOrderCounter();
  
    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('orderCounter', '6'); // Check if counter is set to 6
  });

  it('resets the counter when the date changes', async () => {
    MockDate.set('2023-01-01'); // Mock yesterday's date
    mockedAsyncStorage.getItem.mockImplementation((key: string) => {
      if (key === 'lastOrderDate') return Promise.resolve('2023-01-01');
      if (key === 'orderCounter') return Promise.resolve('5');
      return Promise.resolve(null);
    });

    MockDate.set('2023-01-02'); // Change to today's date
    await incrementOrderCounter();

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('lastOrderDate', '2023-01-02'); // Check if date is updated
    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith('orderCounter', '1'); // Check if counter is reset to 1
  });
});