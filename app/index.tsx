import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { HeaderA } from "./Components";
import { styles } from "./indexStyle";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [count, setCounter] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderA headingTxt="Counter" />

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCounter((count) => count + 1)}
        >
          <Ionicons name="add" size={32} color="green" />
          <Text>Add</Text>
        </TouchableOpacity>

        <View style={styles.countContainer}>
          <Text>Count:</Text>
          <Text style={{ fontSize: 50 }}>{count}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCounter((count) => count - 1)}
        >
          <Ionicons name="remove" size={32} color="green" />
          <Text>Subtract</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
