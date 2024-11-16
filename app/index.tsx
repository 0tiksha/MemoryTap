import React from "react";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Login, HomeScreen, SignUp } from "./Screens";

export default function App() {
  return (
    <Provider store={store}>
      {/* <HomeScreen /> */}
      {/* <Login /> */}
      <SignUp />
    </Provider>
  );
}
