/**
 * For Offline mode only
 */
type OfflineLogType = {
  LogCount: number;
  DateTimeStamp: Date;
  CurrentValue: number;
  OperationType: "add" | "subtract";
  CounterID: string;
  OwnerID: string;
};

export default OfflineLogType;
