import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCurrentTheme } from "hooks";
import { useNavigation } from "@react-navigation/native";


const CategoryItem = ({ icon, iconColor, title, value, isAddNew, navigateTo }) => {
  const navigation = useNavigation();
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
      minHeight: 55,
      flexBasis: "48%",
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
    <Pressable onPress={() => navigateTo && navigation.navigate(navigateTo)} style={styles.block}>
      <View style={styles.icon}>
        {icon}
        <View style={styles.icon_bg} />
      </View>
      <View>
        <Text style={styles.text_title}>{title || "no data"}</Text>
        {!isAddNew && <Text style={styles.text_value}>{value || "0"} PLN</Text>}
      </View>
    </Pressable>
  );
};

export default CategoryItem;
