import { RouteProp } from "@react-navigation/native";
import { CountersScreensParamList } from "./CountersScreensParamList";

export type CounterScreenProps = {
  route: RouteProp<CountersScreensParamList, "Counter">;
};
