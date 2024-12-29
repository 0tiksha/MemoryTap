import { LogType, OfflineLogType } from "@/app/models";
import { IResponse } from "../../models/ResponseModel";
import OfflineLogStorageMapType from "../OfflineLogStorageMapType";

/**
 * Exposes methods for performing operations for data of type Log.
 */
export interface ILogService {
  getLogsForCounter(counterID: string): Promise<IResponse>;
  /**
   * Calls API to register a log for the counter with provided data.
   * @param counterID The counter id
   * @param previousValue The value prior to operation
   * @param operationType The operation performed "add" | "subtract"
   * @returns Promise of IResponse type
   */
  createLogForCounter(
    counterID: string,
    previousValue: number,
    operationType: "add" | "subtract"
  ): Promise<IResponse>;
  /**
   * Creates a log to store in local storage.
   * @param log The Log to store in the local storage
   * @returns promise of boolean for save success or fail
   */
  createLocalLog(log: OfflineLogType): Promise<boolean>;
  /**
   * Gets the logs for the coutner id provided from local storage.
   * @param counterID The counter id whose logs are required.
   * @returns List of Offline Logs
   */
  getLogsForCounterFromLocalStorage(
    counterID: string
  ): Promise<OfflineLogType[]>;
  /**
   * Returns the logs stored in the local data.
   * @async
   * @returns Logs from storage
   */
  getLogsFromLocalStorage(): Promise<OfflineLogStorageMapType>;

  /**
   * @summary Stores the logs to the local data.
   * Returns true if saved successfully or else false.
   * @async
   * @param data The Data to store
   * @returns Promise with boolean value
   */
  storeLogsToLocalStorage(data: OfflineLogStorageMapType): Promise<boolean>;

  /**
   * Uploads the local stored logs to the server.
   * @param counterID The counter id for which the logs are to be synced to server
   */
  syncLogsToServer(counterID: string): Promise<IResponse>;
  /**
   * Updates the logs saved in local storage to be synced as added to database.
   * @param counterID The counter id which the logs belong to
   */
  updateSyncedLogStatus(counterID: string): Promise<boolean>;
  /**
   * Gets the last log created for the counter using API.
   * @param counterID The counter id for which the last log is required
   */
  getLastLogForCounter(counterID: string): Promise<IResponse>;
  /**
   * Gets the latest log from server log and offline log, comparing and getting the last created log.
   * @param counterID The counter id for which the last log is required
   */ resolveLatestLog(
    counterID: string,
    isOnline: boolean
  ): Promise<OfflineLogType | LogType | null>;
}
