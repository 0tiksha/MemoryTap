import { getTokenFromStorage } from "@/app/services/tokenService";
import { CheckTokenReturnType } from "@/app/types/CheckTokenReturnType";
import { useEffect, useState } from "react";
import useLogout from "./useLogout";

/**
 * Gets the token from storage. If not token logsout the session.
 * @returns Token, Loading and Error states.
 */
const useCheckToken = (): CheckTokenReturnType => {
  const [token, setToken] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setTimeout(async () => {
          var data = await getTokenFromStorage();
          if (data) {
            setToken(data);
          } else useLogout();
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        useLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  return [token, loading, error];
};

export default useCheckToken;
