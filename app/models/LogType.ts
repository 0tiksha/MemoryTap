import { BaseEntity, OperationType } from "./index";

/**
 * The Log that is made each time the user clicks a button
 * @extends BaseEntity
 */
export type LogType = BaseEntity & {
  LogID: number;
  CounterID?: number;
  DateTimeStamp: Date;
  NewValue: number;
  PreviousValue: number;
  OperationType?: OperationType;
};

/**
 * For Offline mode only
 */
export type OfflineLogType = {
  LogCount: number;
  DateTimeStamp: Date;
  CurrentValue: number;
  OperationType: "add" | "subtract";
};
