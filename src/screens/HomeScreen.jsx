import React from "react";
import { StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Constants from "expo-constants";

import { HomeHeader, BaseView } from "@components";
import { useSelector } from "react-redux";
import { getThemeStatusBar } from "@constants";
import { appSelectors } from "@redux";

import AnimatedAppLoader from "./AnimatedAppLoaderScreen";
import { ExpensesSub, OutcomeSub } from "./home";
import { LinearGradient } from "expo-linear-gradient";
import { useCurrentTheme } from "hooks";

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

const renderTabBar = (props) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    t: {
      textWrap: "no-wrap",
    },
    tab: {
      fontSize: 16,
      fontWeight: 500,
      color: themeColors.textColor,
      color: "rgba(255, 255, 255, 0.8)",
    },
    tabFocused: {
      color: "#ffffff",
    },
  });
  return (
    <LinearGradient
      colors={[
        themeColors.tabsGradientStart || "#9ad7ff",
        themeColors.tabsGradientEnd || "#3c95d0",
      ]}
      start={{ x: 0.2, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ marginTop: 0 }}
    >
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: "#ffffff",
          width: 15,
          height: 3.5,
          marginLeft: "23%",
          margin: 0,
          marginBottom: 5,
          borderRadius: 5,
        }}
        renderLabel={({ route, focused }) => (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.tab, focused && styles.tabFocused]}
          >
            {route.title}
          </Text>
        )}
        style={{ backgroundColor: "transparent" }}
      />
    </LinearGradient>
  );
};

const RenderTabs = () => {
  const renderScene = SceneMap({
    ov: ExpensesSub,
    we: OutcomeSub,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "ov", title: "Expenses" },
    { key: "we", title: "Outcome" },
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
