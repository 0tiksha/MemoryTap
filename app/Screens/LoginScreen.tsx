import React, { useState } from "react";
import { View } from "react-native";
import { apiBaseUrl } from "../utilities/keys";
import { storeToken } from "../services/tokenService";
import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@rneui/themed";
import { styles } from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ route }: Props) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  async function onSubmit() {
    if (!password || !userEmail) {
      alert("Password and email cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password }),
      }).then((res) => res.json());
      alert(res.message);

      // set the token to the index component state
      // route.params.setToken(res.token);

      // set the token to the localStorage
      await storeToken(res.token);

      setIsLoading(false);

      // redirect to Home screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      if (error instanceof ReferenceError)
        alert("Login Failed: " + error.message);

      setIsLoading(false);
    }
  }

  function onClick() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text h2 style={styles.heading}>
          Memory Tap
        </Text>
      </View>
      <View style={styles.inputGroup}>
        <Input
          style={styles.input}
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={(e) => setUserEmail(e)}
        ></Input>
      </View>

      <View style={styles.inputGroup}>
        <Input
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
        ></Input>
      </View>

      <View style={styles.buttonGroup}>
        <Button onPress={onSubmit} title="Login" loading={isLoading} />
        <Text onPress={onClick}>Create new Account!</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
