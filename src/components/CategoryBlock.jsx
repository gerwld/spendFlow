import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";

const CategoryBlock = ({ icon, iconColor, title, value }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      flexBasis: "45%",
      padding: 7,
      borderColor: themeColors.borderColor,
      borderWidth: 1,
      borderRadius: 12,
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      width: 45,
      height: 45,
      borderRadius: 10,
      marginRight: 8,
      overflow: "hidden",
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: iconColor ? iconColor : "#eee",
      zIndex: -1,
      opacity: 0.5,
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
        <Text style={styles.text_title}>{title ? title : "no data"}</Text>
        <Text style={styles.text_value}>{value ? value : "0"} PLN</Text>
      </View>
    </View>
  );
};

export default CategoryBlock;
