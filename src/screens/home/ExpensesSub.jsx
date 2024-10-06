import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useCurrentTheme } from "hooks";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import React from "react";
import { ButtonInline, DonutChart } from "@components";
import LineItemExpenses from "src/components/LineItemExpenses";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ExpensesSub = () => {
  return (
    <ScrollView>
      <ExpensesBlockScrollable />
      <LastExpenses />
    </ScrollView>
  );
};

const LastExpenses = () => {
  const insets = useSafeAreaInsets();
  return <View style={{marginBottom: insets.bottom + 10}}>
    {[
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
    { l: 1 },
  ].map(({ item }) => <LineItemExpenses />)}
  </View>;
};

const ExpensesBlockScrollable = () => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 2,
      minHeight: 294,
      paddingTop: 0,
      paddingBottom: 0,
      paddingHorizontal: 10,
      backgroundColor: themeColors.bgHighlight,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: themeColors.borderColor,
      shadowColor: "#0c314c",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
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
      fontSize: 15,
      color: themeColors.textColor,
    },
    tabFocused: {
      fontWeight: 400,
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
          alignSelf: "center",
          height: 3,
          margin: 0,
          marginBottom: 5,
          borderRadius: 5,
        }}
        style={{ backgroundColor: "transparent" }}
      />
    );
  };

  const Day = () => {
    const styles = StyleSheet.create({
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      headerCenterBlock: {
        borderBottomColor: themeColors.chevron,
        borderBottomWidth: 1.2,
        paddingVertical: 1,
        padding: 0,
      },
      headerText: {
        textAlign: "center",
        fontSize: 17,
        color: themeColors.textColor,
      },
      hb: {
        justifyContent: "flex-start",
        flex: 1,
      },
    });
    const segments = [
      { color: "#e3e3e3", percentage: 20 },
      { color: "blue", percentage: 10 },
      { color: "green", percentage: 30 },
      { color: "red", percentage: 40 },
    ];
    return (
      <View>
        <View style={styles.header}>
          <ButtonInline text="back" />

          <View style={styles.headerCenterBlock}>
            <Text style={styles.headerText}>Today, October 6</Text>
          </View>

          {true ? (
            <ButtonInline text="front" alignEnd />
          ) : (
            <View style={styles.hb} />
          )}
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <DonutChart
            {...{
              segments,
              centerText: "$1242",
              centerTextColor: themeColors.textColor,
            }}
          />
        </View>
      </View>
    );
  };

  const Week = () => {
    return (
      <View>
        <Text>week</Text>
      </View>
    );
  };
  const Month = () => {
    return (
      <View>
        <Text>month</Text>
      </View>
    );
  };
  const Year = () => {
    return (
      <View>
        <Text>year</Text>
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
    day: Day,
    week: Week,
    month: Month,
    year: Year,
    period: Period,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "day", title: "Day" },
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
