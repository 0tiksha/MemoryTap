import { IResponse } from "../types/interfaces/IResponse";

class ResponseModel implements IResponse {
  message?: string;
  data?: any;
  error?: string;
  isError?: boolean;

  constructor(message?: string, error?: string, data?: any, isError?: boolean) {
    this.message = message;
    this.error = error;
    this.data = data;
    this.isError = isError;
  }
}

export { ResponseModel, IResponse };
