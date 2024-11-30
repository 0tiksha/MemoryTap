// this file contains the code for API and other operations for the Counter entity.

import { ResponseModel } from "../models/ResponseModel";
import { IResponse } from "../types/interfaces/IResponse";
import { createHeaders } from "../utilities/api/headers";
import { apiBaseUrl } from "../utilities/api/url";

/**
 *
 * @param counterName
 * @returns
 */
export async function createNewCounter(
  counterName: string
): Promise<IResponse> {
  const res = await fetch(`${apiBaseUrl}/Counter/Add`, {
    method: "POST",
    headers: await createHeaders(true),
    body: JSON.stringify({
      counterName,
    }),
  });

  let json = await res.json();

  let response = new ResponseModel(json.message, json.error, json.data);

  if (!res.ok) {
    response.isError = true;
  }

  return response;
}

/**
 *
 * @returns Counter[]
 */
export async function getCounterForUsers(): Promise<IResponse> {
  const res = await fetch(`${apiBaseUrl}/Counter/GetAll`, {
    method: "GET",
    headers: await createHeaders(true),
  });

  let json = await res.json();

  let response = new ResponseModel(json.message, json.error, json.data);

  if (!res.ok) {
    response.isError = true;
  }

  return response;
}
