import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";
import { getGreenRedOrGray } from "@constants";
import { useSelector } from "react-redux";
import { categoriesSelectors } from "@redux";
import { IconGlob } from "@components";

const OperationsItem = ({ item }) => {
  let iconColor, icon, categoryItem, accountItem = null;
  const {
accountID,
categoryID,
currency,
id,
timestamp,
title,
type,
value
  } = item;

  if(categoryID)
    categoryItem = useSelector((state) => categoriesSelectors.selectCategoryByID(state, categoryID))

  function getCurrentWithPrefix() {
    return (type === "OPERATION_TYPE_INCOME") ? ("+" + value) : ("-" + value)
  }
  
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
      backgroundColor: categoryItem?.color || themeColors.bgHighlightSec,
      zIndex: -1,
      opacity: categoryItem?.color ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
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
      color: getGreenRedOrGray(getCurrentWithPrefix(value), themeColors).color,
    },
  });

  return (
    <View style={styles.block}>
      <View style={styles.icon}>
        {categoryItem?.icon ? <IconGlob name={categoryItem?.icon} color={categoryItem?.color}/> : null}
        <View style={styles.icon_bg} />
      </View>
      <View>
        <Text style={styles.text_title}>{categoryItem?.title || "no data"}</Text>
        <Text style={styles.text_account}>card</Text>
      </View>
      <Text style={styles.text_operationPrice}>{getCurrentWithPrefix(value) || "no data"} {currency}</Text>
    </View>
  );
};

export default OperationsItem;
