import ILog from "./ILog";

/**
 * For Offline mode only
 */
interface IOfflineLogType extends ILog {
  LogCount: number;
  DateTimeStamp: Date;
  CurrentValue: number;
  OperationType: "add" | "subtract";
  CounterID: string;
  OwnerID: string;
  Synced: boolean; // to check if the log has been added to the server
}

export default IOfflineLogType;
