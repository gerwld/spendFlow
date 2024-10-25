import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCurrentTheme } from "hooks";
import { navigateWithState } from "@constants";
import { useNavigation } from "@react-navigation/native";

const AccountItem = ({id, item, icon, iconColor, title, value, isAddNew, onPress }) => {
  const navigation = useNavigation();
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      marginLeft:  isAddNew ? "auto" : 0,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: isAddNew ? 10 : 8,
      paddingRight: isAddNew ? 15 : 8,
      paddingVertical: isAddNew ? 8 : 6,
      borderWidth: 1,
      borderColor: themeColors.borderColorSec,
      backgroundColor: themeColors.bgHighlightSec,
      borderRadius: isAddNew ? 50 : 12,
      maxHeight: 100,
    },
    icon: {
      width: isAddNew ? 25 : 45,
      height: isAddNew ? 25 : 45,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden"
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: isAddNew ? "transparent" : (iconColor || themeColors.bgHighlightSec),
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

    // "details_screen"
    const onNavigateToDetails = () => {
      navigateWithState("account_details_screen", {item: item}, navigation)
    }

  return (
    <Pressable style={styles.block} onPress={onPress ? onPress : onNavigateToDetails}>
      <View style={styles.icon}>
        {icon}
        <View style={styles.icon_bg} />
      </View>
      <View>
        <Text style={styles.text_title}>{title || "no data"}</Text>
        {!isAddNew &&  <Text style={styles.text_value}>{value || "0"} PLN</Text>}
      </View>
    </Pressable>
  );
};

export default AccountItem;
