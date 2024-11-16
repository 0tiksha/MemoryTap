import { StyleSheet } from "react-native"
import { Metrics } from "@/app/Constants"
import { Colors } from "@/app/Constants/Colors"

export const styles = StyleSheet.create({
container:{
    backgroundColor: "pink",
    flex: 1,
    alignItems:'center',
    // justifyContent:"center"
},
input:{
    backgroundColor:Colors.dark.tint,
    backgroundColor: 'red',
    width: Metrics.sWidth * 0.8,
    height: Metrics.sWidth * 0.2
}
})