import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useCurrentTheme } from "hooks";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import React from "react";

const ExpensesSub = () => {
  return (
    <ScrollView>
      <ExpensesBlockScrollable />
    </ScrollView>
  );
};

const ExpensesBlockScrollable = () => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      margin: 10,
      minHeight: 300,
      paddingTop: 0,
      paddingBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: themeColors.bgHighlight,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.borderColor,
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
  return (
    <View style={styles.block}>
      <RenderTabs />
    </View>
  );
};

const RenderTabs = () => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    t: {
      textWrap: "no-wrap",
    },
    tab: {
      color: themeColors.textColor,
    },
    tabFocused: {
      color: themeColors.tabsActiveColor,
    },
  });

  const renderTabBar = (props) => {
    const [themeColors] = useCurrentTheme();
    return (
      <TabBar
        {...props}
        labelStyle={{
          color: "#000",
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
        indicatorStyle={{
          backgroundColor: themeColors.tabsActiveColor,
          // width: 2,
          alignSelf: "center",
          height: 3,
          // marginLeft: "10%",
          margin: 0,
          marginBottom: 5,
          borderRadius: 5,
        }}
        
        style={{ backgroundColor: "transparent" }}
      />
    );
  };

  const Week = () => {
    return (
      <View>
        <Text>week</Text>
        <Text>week</Text>
        <Text>week</Text>
        <Text>week</Text>
      </View>
    );
  };
  const Month = () => {
    return (
      <View>
        <Text>week</Text>
      </View>
    );
  };
  const Year = () => {
    return (
      <View>
        <Text>week</Text>
      </View>
    );
  };
  const Period = () => {
    return (
      <View>
        <Text>week</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    week: Week,
    month: Month,
    year: Year,
    period: Period,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "week", title: "Week" },
    { key: "month", title: "Month" },
    { key: "year", title: "Year" },
    { key: "period", title: "Period" },
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

export default ExpensesSub;
