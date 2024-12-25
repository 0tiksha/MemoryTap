import { OfflineLogType } from "@/app/models";
import { IResponse } from "../../models/ResponseModel";
import OfflineLogStorageMapType from "../OfflineLogStorageMapType";

export interface ILogService {
  getLogsForCounter(counterID: string): Promise<IResponse>;
  createLogForCounter(
    counterID: string,
    previousValue: number,
    operationType: "add" | "subtract"
  ): Promise<IResponse>;
  createLocalLog(log: OfflineLogType): Promise<boolean>;
  getLogsForCounterFromLocalStorage(
    counterID: string
  ): Promise<OfflineLogType[]>;
  getLogsFromLocalStorage(): Promise<OfflineLogStorageMapType>;
  storeLogsToLocalStorage(data: OfflineLogStorageMapType): Promise<boolean>;
}
