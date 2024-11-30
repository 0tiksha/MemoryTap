import LoadingComponent from "@/app/Components/LoadingComponent";
import { getCounterForUsers } from "@/app/services/counterService";
import ICounter from "@/app/types/interfaces/ICounter";
import { ListItem, Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styles from "./styles";

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

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <View>
      <Text h2 style={styles.heading}>
        Your Counters
      </Text>
      <View>
        {counters?.map((counter, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{counter.counterName}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
};

export default CountersScreen;
