import CounterButton from "@/app/Components/CounterButton";
import { styles } from "@/app/indexStyle";
import { OfflineLogType } from "@/app/models";
import { LogService } from "@/app/services/logsService";
import { ILogService } from "@/app/types/interfaces/ILogService";
import { RouteProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { CountersScreensParamList } from "./CountersScreensParamList";

type CounterScreenProps = {
  route: RouteProp<CountersScreensParamList, "Counter">;
};

const Counter: React.FC<CounterScreenProps> = ({ route }) => {
  const counterID = route.params.counterId;
  const counterName = route.params.counterName;

  const [count, setCounter] = useState<number>(0);
  const [data, setData] = useState<OfflineLogType | null>();
  const [logs, setLogs] = useState<any>();

  const navigation = useNavigation();

  let _logService: ILogService = new LogService();

  // set the title name
  useEffect(() => {
    navigation.setOptions({
      headerTitle: counterName,
    });
  }, []);

  // gets the data from the storage only when offline
  useEffect(() => {
    _logService
      .getLogsForCounterFromLocalStorage(route.params.counterId)
      .then((storedData) => {
        if (storedData != null) {
          setData(storedData[storedData.length - 1]);

          let lastLog = storedData.at(storedData.length - 1);
          if (lastLog?.OperationType === "add")
            setCounter(lastLog.CurrentValue + 1);
          if (lastLog?.OperationType === "subtract")
            setCounter(lastLog.CurrentValue - 1);
        } else {
          setData(null);
        }
      });
  }, []);

  // get the logs for the counter
  useEffect(() => {
    _logService
      .getLogsForCounter(route.params.counterId)
      .then((res) => {
        setLogs(res.data);
        if (res.isError) {
          Alert.alert(
            "Error",
            res.error,
            [{ style: "destructive", text: "Ok" }],
            {
              cancelable: true,
              userInterfaceStyle: "dark",
            }
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          "Unhandled Error",
          error.message,
          [{ style: "destructive", text: "Ok" }],
          {
            cancelable: true,
            userInterfaceStyle: "dark",
          }
        );
      });
  }, []);

  /**
   * @summary Adds a new log to the local storage when a button is clicked.
   * @param operation add or subtract
   */
  const onClick = async (operation: "add" | "subtract") => {
    await AddLocalLog(count, operation, setCounter, counterID);
  };

  async function AddLocalLog(
    count: number,
    operation: "add" | "subtract",
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    counterID: string
  ) {
    let newLog: OfflineLogType = {
      LogCount: data ? data.LogCount + 1 : 1,
      DateTimeStamp: new Date(),
      CurrentValue: count,
      OperationType: operation,
      OwnerID: "",
      CounterID: counterID,
    };

    // Store the data to storage
    _logService.createLocalLog(newLog);

    // Update the counter
    if (operation == "add") setCounter((prev) => prev + 1);
    else setCounter((prev) => prev - 1);
  }

  return (
    <View style={styles.container}>
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
