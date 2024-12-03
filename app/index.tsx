import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./Components/gesture-handler.native";
import LoadingComponent from "./Components/LoadingComponent";
import { RootStackParamList } from "./RootStackParamList";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import HomeScreen from "./Screens/Home/HomeScreen";
import useGetToken from "./utilities/hooks/useCheckToken";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { token, loading, error } = useGetToken();

  // While to operation of fetching token is undegoing show loading screen
  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    Alert.alert("Error", error, [{ text: "Ok", style: "cancel" }], {
      cancelable: true,
    });
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
