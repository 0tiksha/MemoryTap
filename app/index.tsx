import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Counter from "./Screens/CounterScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { RootStackParamList } from "./RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={token ? "Home" : "Login"} // Navigate to Home if token exists
          >
            <Stack.Screen
              name="Home"
              component={Counter}
              options={{
                title: "Home",
                headerShown: true,
                headerLeft: () => null, // Removes back button from Home
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login",
                headerShown: false, // Hides the header
              }}
              // initialParams={{
              //   setToken: setToken,
              // }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                title: "Register",
                headerShown: false, // Hides the header
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </SafeAreaProvider>
  );
}
