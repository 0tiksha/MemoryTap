import React, { useState } from "react";
import LoginScreen from "./Screens/LoginScreen";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Counter from "./Screens/CounterScreen";
import { getTokenFromStorage } from "./utilities/storage/storage";

const Stack = createNativeStackNavigator();

function RootStack() {
  const [token, setToken] = useState<string>("");
  getTokenFromStorage().then((res) => setToken(res));
  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Counter}></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
