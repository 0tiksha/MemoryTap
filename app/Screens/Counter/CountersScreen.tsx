import LoadingComponent from "@/app/Components/LoadingComponent";
import { getCounterForUsers } from "@/app/services/counterService";
import { LogService } from "@/app/services/logsService";
import ICounter from "@/app/types/interfaces/ICounter";
import { ILogService } from "@/app/types/interfaces/ILogService";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import { ListItem, Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, View } from "react-native";
import Counter from "./CounterScreen";
import { CountersScreensParamList } from "./CountersScreensParamList";
import styles from "./styles";

const Stack = createNativeStackNavigator<CountersScreensParamList>();

/**
 *
 * @returns The Navigation Stack for the Counters Screen
 */
function CountersScreen() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Counters"
            component={CounterListComponent}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Counter"
            component={Counter}
            options={{
              headerShown: true,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default CountersScreen;

function CounterListComponent() {
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

  // redirects to the counter screen
  const redirect = useCallback((counterId: string, counterName: string) => {
    navigation.navigate("Counter", {
      counterId,
      counterName,
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
            onPress={() => redirect(counter._id, counter.counterName)}
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
}
