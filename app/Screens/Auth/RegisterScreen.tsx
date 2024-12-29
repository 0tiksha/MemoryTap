import { apiBaseUrl } from "@/app/utilities/api/url";
import { Input, Text, Button } from "@rneui/base";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

export default function RegisterScreen() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation<any>();

  async function onSubmit() {
    if (!password || !userEmail || !userName) {
      alert("Please enter all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, password, userName }),
      }).then((res) => res.json());
      alert(res.message);

      setIsLoading(false);

      // redirect to Login screen
      navigation.navigate("Login");
    } catch (error) {
      if (error instanceof ReferenceError)
        alert("Registration Failed: " + error.message);
      else alert("Registration Failed");

      setIsLoading(false);
    }
  }

  function onClick() {
    navigation.navigate("Login");
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
          placeholder="Enter your Username"
          value={userName}
          onChangeText={(e) => setUserName(e)}
        ></Input>
      </View>
      <View style={styles.inputGroup}>
        <Input
          placeholder="Enter your email"
          value={userEmail}
          onChangeText={(e) => setUserEmail(e)}
        ></Input>
      </View>
      <View style={styles.inputGroup}>
        <Input
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(e) => setPassword(e)}
        ></Input>
      </View>
      <View style={styles.inputGroup}>
        <Input
          placeholder="Re-enter your password"
          secureTextEntry={true}
          value={rePassword}
          onChangeText={(e) => setRePassword(e)}
        ></Input>
      </View>

      <View style={styles.buttonGroup}>
        <Button onPress={onSubmit} title="Register" loading={isLoading} />
        <Text onPress={onClick}>Already Have an account? Login!</Text>
      </View>
    </View>
  );
}
