import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  data: any;
  key: string;
};
/**
 * To store the data to the storage using AsyncStorage lib.
 * @param data -> object to save
 * @param key -> key to store the data with
 */
export const storeData = async ({ data, key }: Props) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error(error);
  }
};

/**
 *
 * @param key string
 * @returns Data from localstorage as for the key provided or null.
 */
export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 *
 * @param key string
 */
export const clearData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

/**
 * Clears the entire storage
 * @returns Promise
 */
export const clearStorage = async () => {
  return await AsyncStorage.clear();
};
