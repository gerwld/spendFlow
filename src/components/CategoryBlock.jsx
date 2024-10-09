import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCurrentTheme } from "hooks";
import { LucidePlus } from "lucide-react-native";
import { getGreenRedOrGray } from "@constants";

const CategoryBlock = ({
  icon,
  iconColor,
  title,
  value,
  account,
  isRow,
  isDaySection,
  addNewPressable,
}) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      flexBasis: isRow && "45%",
      padding: isRow ? 7 : 10,
      borderColor: themeColors.borderColorSec,
      borderWidth: isDaySection ? 0 : 1,
      borderRadius: isRow ? 12 : 10,
      maxHeight: 100,
    },
    icon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width:  isRow ? 45 : 50,
      height: addNewPressable ? 34 : 45,

      borderRadius: isRow ? 10 : 5,
      marginRight: isRow ? 8 : 15,
      overflow: "hidden",
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: iconColor ? iconColor : themeColors.bgHighlightSec,
      zIndex: -1,
      opacity: 0.5,
    },
    text_new: {
      fontSize: 16,
      color: themeColors.gray,
    },
    text_title: {
      fontSize: isDaySection ? 17 : 14,
      color: themeColors.textColorHighlight,
    },
    text_value: {
      fontSize: 18,
      color: themeColors.textColor,
    },
    text_operationPrice: {
      flex: 1,
      fontSize: 17,
      opacity: 0.88,
      textAlign: "right",
      color: getGreenRedOrGray(value, themeColors).color,
    },
    text_account: {
      fontSize: 14,
      lineHeight: 14,
      marginTop: 2,
      color: themeColors.textColor,
      textTransform: "capitalize"
    }
  });

  return (
    <View style={styles.block}>

      <View style={styles.icon}>
        {addNewPressable ? <LucidePlus stroke={themeColors.textColor} /> : icon}
        <View style={styles.icon_bg} />
      </View>

      <View>
        {addNewPressable ? (
          <Text style={styles.text_new}>{title ? title : "no data"}</Text>
        ) : (
          <>
            <Text style={styles.text_title}>{title ? title : "no data"}</Text>
            {isDaySection 
            ? <Text style={styles.text_account}>card</Text>
            : <Text style={styles.text_value}>{value ? value : "0"} PLN</Text>}
          </>
        )}
      </View>

      {isDaySection 
        && <Text style={styles.text_operationPrice}>
            {value ? value : "no data"} PLN
          </Text>}

    </View>
  );
};

export default CategoryBlock;