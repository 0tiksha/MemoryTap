import LoadingComponent from "@/app/Components/LoadingComponent";
import { getCounterForUsers } from "@/app/services/counterService";
import ICounter from "@/app/types/interfaces/ICounter";
import { ListItem, Text } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "expo-router";

const CountersScreen = () => {
  const [counters, setCounters] = useState<ICounter[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading((prev) => !prev);

    getCounterForUsers()
      .then((res) => {
        if (res.isError) {
          Alert.alert("Error", res.error, [], {
            cancelable: true,
            userInterfaceStyle: "dark",
          });
        } else {
          setCounters(res.data);
        }
      })
      .finally(() => setIsLoading((prev) => !prev));
  }, []);

  const navigation = useNavigation<any>();
  const redirect = useCallback((counterID: string) => {
    navigation.navigate("Counter", {
      counterID,
    });
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View>
      <Text h2 style={styles.heading}>
        Your Counters
      </Text>
      <Text style={styles.heading}>Tap on a counter to open it.</Text>
      <View style={styles.listContainer}>
        {counters?.map((counter, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => redirect(counter._id)}
          >
            <ListItem.Content>
              <ListItem.Title>{counter.counterName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default CountersScreen;
