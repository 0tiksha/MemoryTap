import { OfflineLogType } from "../models/";
import { storageKey } from "../utilities/storage/keys";
import { getData, storeData } from "../utilities/storage/storage";

/**
 * @summary Stores the logs to the local data.
 * Returns true if saved successfully or else false.
 * @async
 * @param data The Data to store
 * @returns Promise with boolean value
 */
export const storeLogs = async (data: OfflineLogType[]): Promise<boolean> => {
  try {
    await storeData({ data, key: storageKey });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @summary Returns the logs stored in the local data.
 * @async
 * @returns Logs from storage
 */
export const getLogs = async () => {
  return await getData(storageKey);
};
