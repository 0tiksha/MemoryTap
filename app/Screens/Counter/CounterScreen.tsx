import CounterButton from "@/app/Components/CounterButton";
import { styles } from "@/app/indexStyle";
import { LogType, OfflineLogType } from "@/app/models";
import { LogService } from "@/app/services/logsService";
import { ILogService } from "@/app/types/interfaces/ILogService";
import NetInfo from "@react-native-community/netinfo";
import { Button } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { CounterScreenProps } from "./CounterScreenProps";
import LoadingComponent from "@/app/Components/LoadingComponent";

/**
 * The Counter Component, renders the counter screen.
 * @param param0
 * @returns
 */
const Counter: React.FC<CounterScreenProps> = ({ route }) => {
  const counterID = route.params.counterId;
  const counterName = route.params.counterName;

  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<OfflineLogType | null>();
  const [log, setLog] = useState<any>();

  const navigation = useNavigation();

  const { isConnected } = NetInfo.useNetInfo();

  let _logService: ILogService = new LogService();

  /**
   * @sumary Syncs the logs made for counter to the server.
   */
  async function handleSync() {
    // If offline
    if (!isConnected) {
      Alert.alert(
        "Error",
        "You are offline, please connect to the internet to perform sync.",
        [
          {
            style: "destructive",
            text: "Ok",
          },
        ],
        {
          cancelable: true,
        }
      );

      return;
    }
    const result = await _logService.syncLogsToServer(counterID);
    if (result.isError) {
      Alert.alert("Error", result.error, [
        { style: "destructive", text: "Ok" },
      ]);
    } else {
      _logService.updateSyncedLogStatus(counterID);
      Alert.alert("Success", "Logs synced successfully");
    }
  }

  // set the title name
  useEffect(() => {
    navigation.setOptions({
      headerTitle: counterName,
      headerRight: () => {
        <Button onPress={handleSync}>Sync Logs for this counter</Button>;
      },
    });
  }, [navigation]);

  useEffect(() => {
    _logService
      .resolveLatestLog(
        route.params.counterId,
        isConnected ? isConnected : false
      )
      .then((res) => {
        if (res == null) {
          Alert.alert(
            "Error",
            "Error getting the latest log",
            [
              {
                style: "destructive",
                text: "Ok",
              },
            ],
            {
              cancelable: true,
            }
          );
          return;
        }
        console.log(res);

        // the log is of type OfflineLogType
        if ("Synced" in res) {
          setCount(res.CurrentValue + (res.OperationType === "add" ? 1 : -1));
          setLog(res);
        } else {
          setCount(res.newValue);
          setLog(res);
        }
      });
  }, [route.params.counterId, isConnected]);

  /**
   * @summary Adds a new log to the local storage when a button is clicked.
   * @param operation add or subtract
   */
  const onClick = async (operation: "add" | "subtract") => {
    await AddLocalLog(count, operation, setCount, counterID);
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
      Synced: false,
    };

    // Store the data to storage
    _logService.createLocalLog(newLog);

    // Update the counter
    if (operation == "add") setCounter((prev) => prev + 1);
    else setCounter((prev) => prev - 1);
  }

  if (isConnected == null) {
    return <LoadingComponent />;
  }

  return (
    <View>
      {isConnected ? (
        <Button style={styles.syncBtn} onPress={handleSync}>
          Sync Logs
        </Button>
      ) : null}
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
    </View>
  );
};

export default Counter;
