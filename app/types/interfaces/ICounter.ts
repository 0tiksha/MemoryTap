interface ICounter {
  _id: string; // Unique identifier for the counter
  counterName: string; // Name of the counter
  createdAt: string; // ISO date string representing when the counter was created
  updatedAt: string; // ISO date string representing when the counter was last updated
  owner: string; // ID of the owner (presumably a user ID)
  __v: number; // Version key (usually used by MongoDB)
}

export default ICounter;
