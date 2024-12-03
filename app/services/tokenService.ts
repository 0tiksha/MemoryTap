import { tokenStorageKey } from "../utilities/storage/keys";
import { clearData, getData, storeData } from "../utilities/storage/storage";
import { jwtDecode, JwtPayload } from "jwt-decode";

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

/**
 * Clears token from storage
 * @async
 */
export const clearTokenFromStorage = async () => {
  return await clearData(tokenStorageKey);
};

/**
 * Decoded form of jwt token
 * @returns
 */
export const decodeToken = async (): Promise<JwtPayload> => {
  const token: string = await getTokenFromStorage();
  const decoded: JwtPayload = jwtDecode(token);

  return decoded;
};
