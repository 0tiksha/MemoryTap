import { BaseEntity } from "./index";

/**
 * The log counter type
 * @extends BaseEntity
 */
export type CounterType = BaseEntity & {
  CounterID: Number;
  CreatorID: Number;
  CounterName: string;
};
