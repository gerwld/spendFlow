import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";

const AccountItem = ({ icon, iconColor, title, value }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      padding: 7,
      borderWidth: 1,
      borderColor: themeColors.borderColorSec,
      borderRadius: 12,
      maxHeight: 100,
      
      // flexBasis: "48%",
    },
    icon: {
      width: 45,
      height: 45,
      marginRight: 8,
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
      fontSize: 14,
      color: themeColors.textColorHighlight,
    },
    text_value: {
      fontSize: 18,
      color: themeColors.textColor,
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
        <Text style={styles.text_value}>{value || "0"} PLN</Text>
      </View>
    </View>
  );
};

export default AccountItem;
