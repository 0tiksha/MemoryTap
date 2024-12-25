import { IResponse } from "../types/interfaces/IResponse";

type Params = {
  message?: string;
  error?: string;
  data?: any;
  isError?: boolean;
};

class ResponseModel implements IResponse {
  message?: string;
  data?: any;
  error?: string;
  isError?: boolean;

  constructor(jsonData: Params) {
    this.message = jsonData.message;
    this.error = jsonData.data.rror;
    this.data = jsonData.data;
    this.isError = jsonData.isError;
  }
}

export { ResponseModel, IResponse };
