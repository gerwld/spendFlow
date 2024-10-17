import React from "react";
import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";
import { StatusBar } from "expo-status-bar";
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
                onRightPress={() => navigation.navigate("edit_categories")}
                navigation={navigation} />
          }}>
          <MonthReport />
        </InfiniteCalendar>

        <StatusBar translucent style={statusBarStyle.split("-")[0]} />
      </BaseView>
  );
}


export default React.memo(ReportScreen);
