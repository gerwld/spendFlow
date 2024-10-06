import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Constants from "expo-constants";

import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";

import AnimatedAppLoader from "./AnimatedAppLoaderScreen";
import { Week, Month, Overview } from "./home";

function HomeScreen({ navigation }) {
  const theme = useSelector(appSelectors.selectAppTheme);
  const isInit = useSelector(appSelectors.isHabitsInit);
  const insets = useSafeAreaInsets();

  if (!isInit) return null;

  const statusBarStyle = getThemeStatusBar(theme);

  return (
    <AnimatedAppLoader
      isInit={[isInit, !isNaN(insets.top)]}
      image={{ uri: Constants.expoConfig.splash.image }}
    >
      <BaseView>
        <HomeHeader navigation={navigation} />

        <RenderTabs />
        <StatusBar translucent barStyle={statusBarStyle} />
      </BaseView>
    </AnimatedAppLoader>
  );
}

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: "white",
      width: 5,
      height: 5,
      marginLeft: "16%",
      marginBottom: 5,
      borderRadius: 5,
    }}
    style={{ backgroundColor: "#34b787", marginBottom: 10 }}
  />
);

const RenderTabs = () => {
  const renderScene = SceneMap({
    ov: Overview,
    we: Week,
    mo: Month,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "ov", title: "Overwiew" },
    { key: "we", title: "Week" },
    { key: "mo", title: "Month" },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default React.memo(HomeScreen);
