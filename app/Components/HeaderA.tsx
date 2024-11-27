import React, { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import Metrics from "../Constants/Metrics";

type Props = {
  headingText: string;
};

const HeaderA = ({ headingText }: Props) => {
  return (
    <View style={styles.container}>
      <Text h3 style={styles.heading}>
        {headingText}
      </Text>
    </View>
  );
};

export default HeaderA;

const styles = StyleSheet.create({
  container: {
    width: Metrics.sWidth,
  },
  heading: {
    textAlign: "center",
    marginTop: 20,
  },
});
