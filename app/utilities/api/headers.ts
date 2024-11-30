import { getTokenFromStorage } from "@/app/services/tokenService";

/**
 * Sets the headers required for the API call.
 * @param auth Boolean value that decides to add the token to headers.
 * @returns Headers Object with all required headers.
 */
export async function createHeaders(auth: boolean) {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (auth) {
    const token = await getTokenFromStorage();
    headers.append("Authorization", token);
  }

  return headers;
}
