/**
 * For Offline mode only
 */
type OfflineLogType = {
  LogCount: number;
  DateTimeStamp: Date;
  CurrentValue: number;
  OperationType: "add" | "subtract";
};

export default OfflineLogType;
