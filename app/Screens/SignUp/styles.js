import { Metrics } from "@/app/Constants"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
container:{
    flex:1,
    alignItems:"center"
},
inputs:{
    backgroundColor:"red",
    width: Metrics.sWidth * 0.8,
    height:Metrics.sWidth*0.3
}
})