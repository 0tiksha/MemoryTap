import { LogType, OfflineLogType } from "../models/";
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
  public async resolveLatestLog(
    counterID: string,
    isOnline: boolean
  ): Promise<OfflineLogType | LogType | null> {
    try {
      let latestLog: OfflineLogType | LogType | null = null;

      // all the logs saved in locl storage for the counter id
      let latestLocalLogs = await this.getLogsForCounterFromLocalStorage(
        counterID
      );

      let latestLocalLog = null;
      if (latestLocalLogs != null && latestLocalLogs.length > 0) {
        latestLocalLogs.sort((a, b) =>
          a.DateTimeStamp > b.DateTimeStamp ? -1 : 1
        );

        latestLocalLog = latestLocalLogs[0];
      }

      if (isOnline) {
        // the last log saved on server
        let latestServerLog = await this.getLastLogForCounter(counterID);

        if (latestServerLog.isError) {
          console.log(
            "Error getting lastest log from server",
            latestServerLog.error
          );
          return null;
        }
        // comparing the local log and server log
        if (
          latestLocalLog != null &&
          latestServerLog.data != null &&
          latestLocalLog.DateTimeStamp > latestServerLog.data.createdAt
        ) {
          latestLog = latestLocalLog;
        } else {
          latestLog = latestServerLog.data;
        }
      } else {
        latestLog = latestLocalLog;
      }

      return latestLog;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      return null;
    }
  }

  public async getLastLogForCounter(counterID: string): Promise<IResponse> {
    const res = await fetch(`${apiBaseUrl}/Logs/GetLastLog/${counterID}`, {
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

  public async updateSyncedLogStatus(counterID: string): Promise<boolean> {
    try {
      let logs = await this.getLogsForCounterFromLocalStorage(counterID);
      logs = logs.map((log) => {
        log.Synced = true;
        return log;
      });

      return true;
    } catch (error) {
      return false;
    }
  }

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

  public async getLogsForCounterFromLocalStorage(
    counterID: string
  ): Promise<OfflineLogType[]> {
    let data = await this.getLogsFromLocalStorage();
    return data[counterID] || [];
  }

  public async getLogsFromLocalStorage(): Promise<OfflineLogStorageMapType> {
    let data: string | null = await getData(storageKey);
    let parsedData = data ? JSON.parse(data) : {};
    return parsedData;
  }

  public async storeLogsToLocalStorage(
    data: OfflineLogStorageMapType
  ): Promise<boolean> {
    try {
      await storeData({ data, key: storageKey });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async syncLogsToServer(counterId: string): Promise<IResponse> {
    let logs: OfflineLogType[] = await this.getLogsForCounterFromLocalStorage(
      counterId
    );

    // check if the log has been synced already or not
    logs = logs.filter((log) => !log.Synced);

    let body = {
      counterId,
      logs,
    };

    const res = await fetch(`${apiBaseUrl}/Logs/SyncLogs`, {
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
}
