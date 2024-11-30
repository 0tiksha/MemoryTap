import { OperationType } from "./index";

/**
 * The Log that is made each time the user clicks a button
 */
type LogType = {
  LogID: number;
  CounterID?: number;
  DateTimeStamp: Date;
  NewValue: number;
  PreviousValue: number;
  OperationType?: OperationType;
};

export default LogType;
