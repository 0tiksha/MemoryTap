import { tokenStorageKey } from "../utilities/keys";
import { getData, storeData } from "../utilities/storage/storage";

/**
 * Sets the token to local
 * @async
 * @param token String
 */

export const storeToken = async (token: string): Promise<boolean> => {
  try {
    await storeData({ data: token, key: tokenStorageKey });
    return true;
  } catch (error) {
    return false;
  }
};
/**
 * @async
 * @returns Token
 */
export const getTokenFromStorage = async (): Promise<string> => {
  return await getData(tokenStorageKey);
};
