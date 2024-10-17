import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCurrentTheme } from "hooks";


const SelectCategoryItem = ({ icon, iconColor, title, isAddNew, onPress, isCurrent }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 4,

      borderWidth: 1.5,
      borderColor: isCurrent ? themeColors.tabsActiveColor : themeColors.borderColor,
      borderRadius: 10,
      maxHeight: 100,
      minHeight: 50,
      flexBasis: "45%",
      flex: 1,
    },
    block__addnew: {
      marginTop: 10,
      marginHorizontal: 10,
      width: "100%",
      height: 45,
      maxHeight: 45,

      paddingVertical: 2,
      justifyContent: "center",
      borderRadius: 50,
      backgroundColor: themeColors.tabsActiveColor,
      borderWidth: 0,
      borderColor: "none",
      opacity: 0.9
    },
    icon: {
      width: 38,
      height: 38,
      marginLeft: isAddNew ? -20 : 0,
      marginRight: isAddNew ? 0 : 10,
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
      fontSize: 13.5,
      color: themeColors.textColorHighlight,
    },
    text_title__addnew: {
      color: "#fff",
      fontSize: 15,
      fontWeight: "600"
    },
    text_value: {
      fontSize: 18,
      color: themeColors.textColor,
    },
  });

  return (
    <Pressable onPress={onPress} style={[styles.block, isAddNew && styles.block__addnew]}>
      <View style={styles.icon}>
        {icon}
        <View style={[!isAddNew && styles.icon_bg]} />
      </View>

      <Text style={[styles.text_title, isAddNew && styles.text_title__addnew]}>{title || "no data"}</Text>

    </Pressable>
  );
};

export default SelectCategoryItem;
