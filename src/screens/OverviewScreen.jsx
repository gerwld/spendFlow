import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";

import AnimatedAppLoader from "./AnimatedAppLoaderScreen";
import { StatusBar } from "expo-status-bar";
import MonthGeneral from "./home/MonthGeneral";


// import {useIsFocused} from '@react-navigation/native';
// const isFocused = useIsFocused();

function OverviewScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme);
  const isInit = useSelector(appSelectors.isHabitsInit);
  const insets = useSafeAreaInsets();
  const statusBarStyle = getThemeStatusBar(theme, true);
  
  if (!isInit) return null;
  
  return (
    <AnimatedAppLoader
      isInit={[isInit, !isNaN(insets.top)]}
      image={{ uri: Constants.expoConfig.splash.image }}
    >
      <BaseView>
        <HomeHeader navigation={navigation} />
        <MonthGeneral/>
      </BaseView>
        <StatusBar translucent style={statusBarStyle.split("-")[0]} />
    </AnimatedAppLoader>
  );
}


export default React.memo(OverviewScreen);
