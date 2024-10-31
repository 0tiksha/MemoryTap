import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { HeaderA } from "./Components";
import { styles } from "./indexStyle";
import { getData, storeData } from "./utilities/storage/storage";
import { OfflineLogType } from "./models/LogType";
import CounterButton from "./Components/CounterButton";

export default function HomeScreen() {
  const [count, setCounter] = useState<number>(0);
  const [data, setData] = useState<OfflineLogType | null>();

  // gets the data from the storage
  useLayoutEffect(() => {
    getData().then((storedData) => {
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
      console.log(data);
    });
  }, []);

  /**
   * When the buttons are clicked
   * @param operation -> add or subtract
   */
  const onClick = async (operation: "add" | "subtract") => {
    let newLog: OfflineLogType = {
      LogCount: data ? data.LogCount + 1 : 1,
      DateTimeStamp: new Date(),
      CurrentValue: count,
      OperationType: operation,
    };

    // Store the data to storage
    let oldStoredData = await getData();
    storeData({ data: oldStoredData ? [...oldStoredData, newLog] : [newLog] });

    // Update the counter
    if (operation == "add") setCounter((prev) => prev + 1);
    else setCounter((prev) => prev - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderA headingTxt="Counter" />

      <View style={styles.btnContainer}>
        <CounterButton label="add" onClick={() => onClick("add")} />

        <View style={styles.countContainer}>
          <Text>Count:</Text>
          <Text style={{ fontSize: 50 }}>{count}</Text>
        </View>

        <CounterButton label="remove" onClick={() => onClick("subtract")} />
      </View>
    </SafeAreaView>
  );
}
