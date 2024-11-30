import "./Components/gesture-handler.native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./RootStackParamList";
import { getTokenFromStorage } from "./services/tokenService";
import HomeScreen from "./Screens/Home/HomeScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import LoadingComponent from "./Components/LoadingComponent";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        let data = await getTokenFromStorage();
        setToken(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // While to operation of fetching token is undegoing show loading screen
  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={token ? "Home" : "Login"} // Navigate to Home if token exists
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login",
                headerShown: false, // Hides the header
              }}
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
