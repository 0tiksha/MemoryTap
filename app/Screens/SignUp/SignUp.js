import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, Text,TextInput, TouchableOpacity, View } from "react-native";
import { HeaderA } from "../../Components/HeaderA";
import { styles } from "./styles";
import { getData, storeData } from "../../utilities/storage/storage";
import { OfflineLogType } from "../../models/LogType";
import CounterButton from "../../Components/CounterButton";
import { useDispatch, useSelector } from "react-redux";
import { InputBox } from "@/app/Components";

export default function SignUp() {
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [pass,setPass] = useState("")

  /**
   * When the buttons are clicked
   * @param operation -> add or subtract
   */


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputs}>
    <InputBox
    value={name}
    placeholder="Name"
    label="Name"
    changeValue={(txt)=>setName(txt)}

    />
      </View>

    </SafeAreaView>
  );
}
