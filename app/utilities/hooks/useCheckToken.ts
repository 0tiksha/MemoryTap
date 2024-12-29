import { decodeToken, getTokenFromStorage } from "@/app/services/tokenService";
import { CheckTokenReturnType } from "@/app/types/CheckTokenReturnType";
import { useEffect, useState } from "react";

/**
 * Gets the token from storage. If not token logsout the session.
 * @returns Token, Loading and Error states.
 */
const useGetToken = (): CheckTokenReturnType => {
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchToken = async () => {
      setTimeout(async () => {
        try {
          var data = await getTokenFromStorage();
          if (data) {
            // Check Token for expiration
            const { exp } = await decodeToken();

            // if the exp is not present or token has expired.
            if (exp && exp * 1000 < Date.now()) {
            } else {
              // set the token
              setToken(data);
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }, 2000);
    };

    fetchToken();
  }, []);

  return { token, loading, error };
};

export default useGetToken;
