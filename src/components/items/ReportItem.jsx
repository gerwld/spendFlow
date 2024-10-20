import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useCurrentTheme } from "hooks";
import { getGreenRedOrGray } from "@constants";
import Animated, { FadeIn } from "react-native-reanimated";

const DELAY = 50;

const ReportItem = ({index, isCurrentPage, icon, iconColor, title, value = -20, isAddNew, onPress, isCurrent, isSelect }) => {
  const inNoAnimationGap = index < 2;
  const [isInit, setInit] = useState(inNoAnimationGap);

  useEffect(() => {
    isCurrentPage && setTimeout(() => {
      setInit(true)
    }, DELAY * index - 1)
  }, [isCurrentPage])
  
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      flexDirection: "row",
      alignItems: "center",
      padding: 7,
      marginRight: isAddNew ? "auto" : 0,
      marginLeft: isAddNew ? "1.9%" : 0,
      borderWidth: isSelect ? 1.2 : 0,
      borderColor: isCurrent ? themeColors.tabsActiveColor : themeColors.borderColorSec,
      borderRadius: 12,
      maxHeight: 100,
      minHeight: 55,
    },
    icon: {
      width: 35,
      height: 35,
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
    text_count: {
      fontSize: 14,
      color: themeColors.textColor,
    },
    row: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    total_value: {
      color: getGreenRedOrGray(value, themeColors).color
    },
    content: {
      flex: 1,
      width: "100%"
    }
  });

  if(!isInit) return;

  return (
    <Pressable onPress={onPress}>
      <Animated.View entering={inNoAnimationGap ? null : FadeIn.duration(200)} style={styles.block}>
      <View style={styles.icon}>
        {icon}
        <View style={styles.icon_bg} />
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.text_title}>{title || "no data"}</Text>
          <Text style={[styles.text_title, styles.total_value]}>{value || 0} PLN</Text>
        </View>
        <View style={styles.row}>
          {!isAddNew && <Text style={styles.text_count}>{null || "5"} transactions</Text>}
          {!isAddNew && <Text style={styles.text_count}>{null || "5"} %</Text>}
        </View>
      </View>
      </Animated.View>
    </Pressable>
  );
};

export default ReportItem;
