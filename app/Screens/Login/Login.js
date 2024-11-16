import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text,TextInput, TouchableOpacity, View } from "react-native";
import { HeaderA } from "../../Components/HeaderA";
import { styles } from "./styles";
import { getData, storeData } from "../../utilities/storage/storage";
import { OfflineLogType } from "../../models/LogType";
import CounterButton from "../../Components/CounterButton";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {

  /**
   * When the buttons are clicked
   * @param operation -> add or subtract
   */


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
      placeholder="Name"
      style= {styles.input}
      
      />
    </SafeAreaView>
  );
}
