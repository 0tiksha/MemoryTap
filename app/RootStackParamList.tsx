import React from "react";

export type RootStackParamList = {
  Login: { setToken: React.Dispatch<React.SetStateAction<string | null>> };
  Home: undefined;
  Register: undefined;
};
