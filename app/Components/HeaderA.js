import { StyleSheet, Text, View } from "react-native"
import {sWidth} from "../Constants/Metrics"

interface headerProps = {
    headingTxt: String,
    
} 

export const HeaderA = ({ headingTxt }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                {headingTxt}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: sWidth
    },
    heading: {

    }
})