import CounterButton from "@/app/Components/CounterButton";
import HeaderA from "@/app/Components/HeaderA";
import { styles } from "@/app/indexStyle";
import { OfflineLogType } from "@/app/models";
import { getLogs, storeLogs } from "@/app/services/logsService";
import { Text } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { CountersScreensParamList } from "./CountersScreensParamList";
import { useNavigation } from "expo-router";

type CounterScreenProps = {
  route: RouteProp<CountersScreensParamList, "Counter">;
};

const Counter: React.FC<CounterScreenProps> = ({ route }) => {
  const [count, setCounter] = useState<number>(0);
  const [data, setData] = useState<OfflineLogType | null>();

  const navigation = useNavigation();

  // set the title name
  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.counterName,
    });
  }, []);

  // gets the data from the storage
  useEffect(() => {
    getLogs().then((storedData) => {
      if (storedData != null) {
        setData(storedData[storedData.length - 1]);

        let lastLog = storedData.at(storedData.length - 1);
        if (lastLog.OperationType === "add")
          setCounter(lastLog.CurrentValue + 1);
        if (lastLog.OperationType === "subtract")
          setCounter(lastLog.CurrentValue - 1);
      } else {
        setData(null);
      }
    });
  }, []);

  /**
   * @summary Adds a new log to the local storage when a button is clicked.
   * @param operation add or subtract
   */
  const onClick = async (operation: "add" | "subtract") => {
    let newLog: OfflineLogType = {
      LogCount: data ? data.LogCount + 1 : 1,
      DateTimeStamp: new Date(),
      CurrentValue: count,
      OperationType: operation,
    };

    // Store the data to storage
    let oldStoredData = await getLogs();
    await storeLogs(oldStoredData ? [...oldStoredData, newLog] : [newLog]);

    // Update the counter
    if (operation == "add") setCounter((prev) => prev + 1);
    else setCounter((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <HeaderA headingText="Counters" />

      <View style={styles.btnContainer}>
        <CounterButton label="add" onClick={() => onClick("add")} />

        <View style={styles.countContainer}>
          <Text>Count:</Text>
          <Text style={{ fontSize: 50 }}>{count}</Text>
        </View>

        <CounterButton label="remove" onClick={() => onClick("subtract")} />
      </View>
    </View>
  );
};

export default Counter;
