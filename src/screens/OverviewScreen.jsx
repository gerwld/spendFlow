import React from "react";

import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";

import { StatusBar } from "expo-status-bar";
import MonthGeneral from "./home/MonthGeneral";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";


// import {useIsFocused} from '@react-navigation/native';
// const isFocused = useIsFocused();

function OverviewScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme);
  const isInit = useSelector(appSelectors.isHabitsInit);
  const statusBarStyle = getThemeStatusBar(theme, true);

  if (!isInit) return null;

  return (
      <BaseView>
        <HomeHeader navigation={navigation} />
        <InfiniteCalendar>
          <MonthGeneral />
        </InfiniteCalendar>

      <StatusBar translucent style={statusBarStyle.split("-")[0]} />
      </BaseView>
  );
}


export default React.memo(OverviewScreen);
