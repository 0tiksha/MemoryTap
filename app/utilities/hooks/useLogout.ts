import { clearTokenFromStorage } from "@/app/services/tokenService";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";

/**
 * Logs out the user by clearing the token.
 * @returns Error if any
 */
const useLogout = () => {
  const [error, setError] = useState<string>();

  const navigation = useNavigation<any>();

  useEffect(() => {
    const clearToken = async () => {
      await clearTokenFromStorage();
    };

    clearToken()
      .then((res) => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        }
      });
  }, []);

  return error;
};

export default useLogout;
