import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey, tokenStorageKey } from "../keys";

/**
 * Sets the token to local
 * @async
 * @param token String
 */
export const storeToken = async (token: string) => {
  await storeData({ data: token, key: tokenStorageKey });
};

/**
 * @async
 * @returns Token
 */
export const getTokenFromStorage = async () => {
  return await getData(tokenStorageKey);
};

type Props = {
  data: any;
  key: string;
};

/**
 * To store the data to the storage using AsyncStorage lib.
 * @param data -> object to save
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
 * @returns Data from localstorage as for the key provided
 */
export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    return data != null ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
  }
};
