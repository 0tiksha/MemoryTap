import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { apiBaseUrl } from "../utilities/keys";
import { storeToken } from "../utilities/storage/storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";

type Props = {
  navigation: NativeStackNavigationProp<{ Home: undefined }, "Home">;
};

const LoginScreen = ({ navigation }: Props) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit() {
    if (!password || !userEmail) {
      alert("Password and email cannot be empty");
    }

    try {
      const res = await fetch(`${apiBaseUrl}/Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password }),
      }).then((res) => res.json());
      console.log(res);
      alert(res.message);

      // set the token to the localStorage
      await storeToken(res.token);

      // redirect to Home screen
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <h1 style={styles.heading}>Memory Tap</h1>
      </View>
      <View style={styles.inputGroup}>
        <Text>User Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={(e) => setUserEmail(e)}
        ></TextInput>
      </View>

      <View style={styles.inputGroup}>
        <Text>User Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
        ></TextInput>
      </View>

      <View style={styles.buttonGroup}>
        <Button onPress={onSubmit} title="Login" />
        <Text>Create new Account!</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    padding: 10,
  },
  heading: {
    textAlign: "center",
  },
  inputGroup: {},
  input: {
    padding: 5,
    borderStyle: "solid",
  },
  buttonGroup: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
