import ILog from "./ILog";

/**
 * The Log that is made each time the user clicks a button
 */
interface ILogType extends ILog {
  counter: string;
  newValue: number;
  previousValue: number;
  operationType: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export default ILogType;
