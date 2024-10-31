import { BaseEntity } from "./";

/**
 * User of the app
 * @extends BaseEntity
 */
export type User = BaseEntity & {
  UserID: Number;
  Email: string;
  UserName: string;
  Password: string;
};
