import { Image, StyleSheet, Platform, SafeAreaView, View, Text } from 'react-native';
import React from 'react';
import {styles} from "./indexStyle"
import {HeaderA} from "./Components"

export default function HomeScreen() {
  return (
<SafeAreaView
style={styles.container}
>
<HeaderA
headingTxt="Counter"
/>

</SafeAreaView>
  );
}


