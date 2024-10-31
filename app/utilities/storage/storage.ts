import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "../keys";

type Props = {
  data: any;
};

/**
 * To store the data to the storage using AsyncStorage lib.
 * @param data -> object to save
 * @todo Update the implementation to add the new log to the old one
 */
export const storeData = async ({ data }: Props) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(storageKey, jsonData);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @returns Logs Saved
 * @todo Update the method to only return the last log
 */
export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
  }
};
