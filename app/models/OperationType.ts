import { BaseEntity } from "./BaseEntity";

/**
 * Operation -> add or subtract
 * @extends BaseEntity
 */
export type OperationType = BaseEntity & {
  OperationID: Number;
  OperationName: "add" | "subtract";
};
