import { Dialog, Input, Icon, Text, Button } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { createNewCounter } from "../../services/counterService";
import styles from "./styles";

export default function WelcomeComponent() {
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);

  const [counterName, setCounterName] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onCreatePress() {
    setIsCreateModalVisible((prev) => !prev);
  }
  async function onCheckPress() {
    setIsLoading((prev) => !prev);

    // API call
    const res = await createNewCounter(counterName);

    if (res.isError) {
      Alert.alert("Error", res.error, [], {
        cancelable: true,
        userInterfaceStyle: "dark",
      });
    } else {
      Alert.alert("Success", res.message, [], {
        cancelable: true,
        userInterfaceStyle: "light",
      });
    }

    setTimeout(() => {
      setIsLoading((prev) => !prev);
      setIsCreateModalVisible((prev) => !prev);
    }, 2000);
  }
  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        Welcome to Memory Tap!
      </Text>
      <View>
        <Button
          title="Create new Counter!"
          color="secondary"
          style={styles.createBtn}
          onPress={onCreatePress}
        ></Button>
      </View>
      <Dialog isVisible={isCreateModalVisible}>
        <Dialog.Title title="Please enter the name for counter" />
        <View>
          <Input value={counterName} onChangeText={(e) => setCounterName(e)} />
          <Button
            color="success"
            icon={<Icon name="check" />}
            onPress={onCheckPress}
            loading={isLoading}
          />
        </View>
      </Dialog>
    </View>
  );
}
