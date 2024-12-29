import { IResponse } from "./interfaces/IResponse";

type ServiceResponseType = () => Promise<IResponse>;

export default ServiceResponseType;
