import { View, Text, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCurrentTheme } from "hooks";
import { habitSelectors } from "@redux";
import { PLATFORM } from "@constants";
import { FlatList } from "react-native-gesture-handler";
import { HomeHeader, BaseView, LastSevenDays, HomeTask } from "@components";

const Month = () => {
  const { t } = useTranslation();
  const [themeColors] = useCurrentTheme();
  const itemsIDs = useSelector(habitSelectors.selectItemsIDs);

  const renderItem = useCallback(
    ({ item }) => <HomeTask itemID={item} color={themeColors.textColor} />,
    [themeColors]
  );

  const styles = StyleSheet.create({
    begin: {
      justifyContent: "center",
      alignItems: "center",
      height: "80%",
      opacity: 0.5,
    },
    beginText: {
      fontSize: 21,
    },
  });

  const keyExtractor = (item) => item;

  if (!itemsIDs || !itemsIDs.length) {
    return (
      <View style={styles.begin}>
        <Text style={[styles.beginText, { color: themeColors.textColor }]}>
          {t("mp_addnew")}
        </Text>
      </View>
    );
  }

  const flatListProps = {
    contentContainerStyle: { paddingBottom: 60 },
    data: itemsIDs,
    renderItem,
    keyExtractor,
    ...(PLATFORM === "android"
      ? { overScrollMode: "always", scrollEnabled: true }
      : { bounces: true }),
  };

  return (
    <>
      <FlatList {...flatListProps} />
    </>
  );
};

export default Month;
