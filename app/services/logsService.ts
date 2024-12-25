import { OfflineLogType } from "../models/";
import { IResponse, ResponseModel } from "../models/ResponseModel";
import { createHeaders } from "../utilities/api/headers";
import { apiBaseUrl } from "../utilities/api/url";
import { storageKey } from "../utilities/storage/keys";
import { getData, storeData } from "../utilities/storage/storage";
import { ILogService } from "../types/interfaces/ILogService";
import OfflineLogStorageMapType from "../types/OfflineLogStorageMapType";

/**
 * Exposes methods for working with logs.
 * @implements ILogService
 */
export class LogService implements ILogService {
  /**
   *
   * @param log The Log to store in the local storage
   * @returns promise of boolean for save success or fail
   */
  public async createLocalLog(log: OfflineLogType): Promise<boolean> {
    try {
      const counterID = log.CounterID;

      let oldStoredData = await this.getLogsFromLocalStorage(); // Already parsed JSON, no need for additional parsing

      console.log(oldStoredData); // Debugging to ensure data is as expected

      // Update or initialize the logs for the specific counterID
      if (oldStoredData[counterID]) {
        oldStoredData[counterID].push(log);
      } else {
        oldStoredData[counterID] = [log];
      }

      // Save the updated logs back to storage
      return await this.storeLogsToLocalStorage(oldStoredData);
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  /**
   * Calls API to register a log for the counter with provided data.
   * @param counterID The counter id
   * @param previousValue The value prior to operation
   * @param operationType The operation performed "add" | "subtract"
   * @returns Promise of IResponse type
   */
  public async createLogForCounter(
    counterID: string,
    previousValue: number,
    operationType: "add" | "subtract"
  ): Promise<IResponse> {
    const body = {
      newValue: operationType === "add" ? previousValue + 1 : previousValue - 1,
      previousValue,
      operationType,
    };

    const res = await fetch(`${apiBaseUrl}/Logs/AddLog/${counterID}`, {
      method: "POST",
      headers: await createHeaders(true),
      body: JSON.stringify(body),
    });

    let json = await res.json();
    let response = new ResponseModel(json);

    if (!res.ok) {
      response.isError = true;
    }

    return response;
  }

  public async getLogsForCounter(counterID: string): Promise<IResponse> {
    const res = await fetch(`${apiBaseUrl}/Logs/LogsByCounter/${counterID}`, {
      method: "GET",
      headers: await createHeaders(true),
    });

    let json = await res.json();
    let response = new ResponseModel(json);

    if (!res.ok) {
      response.isError = true;
    }

    return response;
  }

  /**
   * Gets the logs for the coutner id provided from local storage.
   * @param counterID The counter id whose logs are required.
   * @returns List of Offline Logs
   */
  async getLogsForCounterFromLocalStorage(
    counterID: string
  ): Promise<OfflineLogType[]> {
    let data = await this.getLogsFromLocalStorage();
    return data[counterID] || [];
  }
  /**
   * Returns the logs stored in the local data.
   * @async
   * @returns Logs from storage
   */
  getLogsFromLocalStorage = async (): Promise<OfflineLogStorageMapType> => {
    let data: string | null = await getData(storageKey);
    let parsedData = data ? JSON.parse(data) : {};
    return parsedData;
  };

  /**
   * @summary Stores the logs to the local data.
   * Returns true if saved successfully or else false.
   * @async
   * @param data The Data to store
   * @returns Promise with boolean value
   */
  storeLogsToLocalStorage = async (
    data: OfflineLogStorageMapType
  ): Promise<boolean> => {
    try {
      await storeData({ data, key: storageKey });
      return true;
    } catch (error) {
      return false;
    }
  };
}
