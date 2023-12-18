// permissions.ts
import { PermissionsAndroid } from 'react-native';

export const requestInitialPermissions = async () => {
  try {
    const storageGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission for Printer",
        message: "Storage access is needed to handle print data.",
        buttonNeutral: "Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Storage permission for printer denied");
      // Handle the denial appropriately
    } else {
      console.log("Storage permission granted");
      // Permissions are granted
    }
  } catch (err) {
    console.warn("Error requesting printer permissions", err);
  }
};
