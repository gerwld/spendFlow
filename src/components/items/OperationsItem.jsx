import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";
import { getGreenRedOrGray } from "@constants";

const OperationsItem = ({ icon, iconColor, title, value }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 7,
      maxHeight: 100,
      marginLeft: 5
    },
    icon: {
      width: 38,
      height: 38,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden"
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: iconColor || themeColors.bgHighlightSec,
      zIndex: -1,
      opacity: iconColor ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
    },
    text_title: {
      fontSize: 17,
      color: themeColors.textColorHighlight,
    },
    text_account: {
      fontSize: 14,
      lineHeight: 14,
      marginTop: 2,
      color: themeColors.textColor,
    },
    text_operationPrice: {
      flex: 1,
      fontSize: 15,
      textAlign: "right",
      color: getGreenRedOrGray(value, themeColors).color,
    },
  });

  return (
    <View style={styles.block}>
      <View style={styles.icon}>
        {icon}
        <View style={styles.icon_bg} />
      </View>
      <View>
        <Text style={styles.text_title}>{title || "no data"}</Text>
        <Text style={styles.text_account}>card</Text>
      </View>
      <Text style={styles.text_operationPrice}>{value || "no data"} PLN</Text>
    </View>
  );
};

export default OperationsItem;
