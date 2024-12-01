import IBase from "./IBase";

/**
 * Interface for Counter Entity
 */
interface ICounter extends IBase {
  counterName: string; // Name of the counter
  owner: string; // ID of the owner (presumably a user ID)
}

export default ICounter;
