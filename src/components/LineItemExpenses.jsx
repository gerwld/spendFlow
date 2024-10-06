import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks';

const LineItemExpenses = ({color}) => {
    const [themeColors] = useCurrentTheme();


    const styles = StyleSheet.create({
        block: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between",
            marginHorizontal: 10,
            marginTop: 8,
            minHeight: 58,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 12,
            paddingRight: 14,
            backgroundColor: themeColors.bgHighlight,
            borderRadius: 7,
            borderWidth: 1,
            borderColor: themeColors.borderColor,
            shadowColor: "#143954",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1
        },
        icon: {
            backgroundColor: color,
            width: 40,
            height: 40,
            borderRadius: 40,
            opacity: 0.8,
        },
        percentage: {
            flexBasis: "10%",
            marginRight: "10%",
            color: themeColors.textColor
        },
        sum : {
            flexBasis: "10%",
            color: themeColors.textColorHighlight
        },
        title: {
            flex: 1,
            marginLeft: 15,
            color: themeColors.textColorHighlight

            // flexBasis: "45%"
        }
    })
  return (
    <View style={styles.block}>
        <View style={styles.icon}></View>
        <Text style={styles.title}>LineItemExpenses</Text>
        <Text style={styles.percentage}>40%</Text>
        <Text style={styles.sum}>$20</Text>
      
    </View>
  )
}

export default LineItemExpenses