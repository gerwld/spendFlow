import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";

const getGreenRedOrGray = (val, styles) => {
  return {
    color: val > 0 ? styles.green : val == 0 ? styles.gray : styles.red,
    dimmed: val > 0 ? styles.green_dimmed : val == 0 ? styles.gray_dimmed : styles.red_dimmed,
  };
};

const StatBlock = ({ iconColor, title, value, isRow, currency }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      // flexBasis: isRow && "45%",
      padding: 0,
      borderColor: themeColors.borderColorSec,
      borderWidth: 1,
      borderRadius: 10,
    },
    text_new: {
      fontSize: 16,
      color: themeColors.gray,
    },
    text_title: {
      fontSize: 20,
      color: themeColors.textColorHighlight,
    },
    text_value: {
      fontSize: 18,
      color: themeColors.textColor,
    },

    group: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 2
    },
    content: {
      flex: 1,
      minWidth: "100%",
      padding: 10,
    },

    header: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 6,
      margin: "2%",
      alignSelf: "left",
      padding: 10,
      minWidth: "40%",
      paddingHorizontal: 20,
      borderColor: getGreenRedOrGray(value, themeColors).color,
      borderWidth: 0.2,
      backgroundColor: getGreenRedOrGray(value, themeColors).dimmed,
    },
  
    text_header: {
      color: getGreenRedOrGray(value, themeColors).color,
      fontSize: 20,
      fontWeight: "500"
    },
    text_debt: {
      fontSize: 14,
      color: themeColors.textColorHighlight,
    }
  });

  return (
    <View style={styles.block}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text
            style={styles.text_header}
          >
            {value > 0 ? value : "0"} PLN
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.group}>
            <Text style={styles.text_title}>
              {currency ? currency : "no data"}
            </Text>
            <Text style={styles.text_value}>{value > 0 ? value : "0"} PLN</Text>
          </View>

          <View style={styles.group}>
            <Text style={styles.text_debt}>& Debt</Text>
            <Text
              style={[styles.text_value, getGreenRedOrGray(value, themeColors), {fontSize: 15}]}
            >
              {value < 0 ? value : "0"} PLN
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StatBlock;
