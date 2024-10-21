import React from "react";
import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";
import MonthReport from "../components/MonthReport";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";

function ReportScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme);
  const isInit = true;
  const statusBarStyle = getThemeStatusBar(theme, true);

  if (!isInit) return null;

  return (
      <BaseView>
        <InfiniteCalendar 
          {...{
            // shortGradient: true,
            // isGradient: true, 
            renderTopHeader: () =>
              <HomeHeader 
                onRightPress={() => navigation.navigate("edit_categories_screen")}
                navigation={navigation} />
          }}>
          <Text style={{color: "#5f959e", borderWidth: 1, borderColor: "#5f959e", width: "90%", height: 100, borderRadius: 5}}>Statistics Block</Text>
          <MonthReport />
        </InfiniteCalendar>

        <StatusBar translucent style={statusBarStyle.split("-")[0]} />
      </BaseView>
  );
}


export default React.memo(ReportScreen);
