import React from "react";
import { HomeHeader, BaseView } from "@components";
import { shallowEqual, useSelector } from "react-redux";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { getThemeStatusBar } from "@constants";
import { appSelectors, categoriesSelectors } from "@redux";
import MonthReport from "../components/MonthReport";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";
import { useCurrentTheme } from "hooks";

function ReportScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme);
  const isInit = true;
  const statusBarStyle = getThemeStatusBar(theme, true);

  if (!isInit) return null;

  return (
      <BaseView>
        <InfiniteCalendar 
          {...{
            renderHeader: () =>  <StatisticsBlock/>,
            renderTopHeader: () =>
              <HomeHeader 
                onRightPress={() => navigation.navigate("edit_categories_screen")}
                navigation={navigation} />
          }}>
         
          <MonthReport />
        </InfiniteCalendar>

        <StatusBar translucent style={statusBarStyle.split("-")[0]} />
      </BaseView>
  );
}

const StatisticsBlock = () => {
  const STATWIDTH = 30;
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
  block: {
    alignSelf: "center",
    width: "92%",
    maxWidth: 360,
    marginHorizontal: 15,
    height: STATWIDTH,
    borderWidth: 1,
    borderColor: themeColors.borderColorTh,
    borderRadius: 6,
    flexDirection: "row",
    overflow: "hidden",
  },
  child: {
    width: 30,
    height: STATWIDTH - 2,
    borderRadius: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    marginLeft: -1.5
  },
  });

  const {categories, categoriesArray} = useSelector(state => categoriesSelectors.selectCategoriesAndIDs(state), shallowEqual)
  console.log(categories);

  const renderItems = (item, index) => (
    <Pressable key={item.id} style={[styles.child, {backgroundColor: item.color, zIndex: 1000 - index}, index === 0 && {marginLeft: 0}]}></Pressable>
  )
  
return (
  <View style={styles.block}>
    {categoriesArray?.map((item, i) => renderItems(categories[item], i))}
  </View>
);
}


export default React.memo(ReportScreen);
