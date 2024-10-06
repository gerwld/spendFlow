import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useCurrentTheme } from "hooks";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import React, { useState } from "react";
import { ButtonInline, DonutChart } from "@components";
import LineItemExpenses from "src/components/LineItemExpenses";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgBack, SvgFront } from "@icons";

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
  const segments = [
    { color: "#f24848", percentage: 20 },
    { color: "#f2a348", percentage: 10 },
    { color: "#a3f248", percentage: 20 },
    { color: "#48c8f2", percentage: 30 },
    { color: "#f248bf", percentage: 10 },
    { color: "#48f2e1", percentage: 10 },
  ];

  return <View style={{marginBottom: insets.bottom + 10}}>
    {[...segments, ...segments].map(( item ) => <LineItemExpenses {...item} />)}
  </View>;
};

const ExpensesBlockScrollable = () => {
  const [tabViewHeight, setTabViewHeight] = useState(310);
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    block: {
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 2,
      minHeight: tabViewHeight,
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
      <RenderTabs setTabViewHeight={setTabViewHeight} />
    </View>
  );
};

const RenderTabs = ({setTabViewHeight}) => {
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
      ic: {
        color: themeColors.textColor,
      }
    });
    const segments = [
      { color: "#f24848", percentage: 20 },
      { color: "#f2a348", percentage: 10 },
      { color: "#a3f248", percentage: 20 },
      { color: "#48c8f2", percentage: 30 },
      { color: "#f248bf", percentage: 10 },
      { color: "#48f2e1", percentage: 10 },
    ];
    return (
      <View>
        <View style={styles.header}>
          <ButtonInline>
            <SvgBack style={styles.ic}/>
          </ButtonInline>

          <View style={styles.headerCenterBlock}>
            <Text style={styles.headerText}>Today, October 6</Text>
          </View>

          {true ? (
            <ButtonInline alignEnd>
              <SvgFront style={styles.ic}/>
            </ButtonInline>
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


   const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    if (routes[newIndex].key === 'week') {
      setTabViewHeight(500);
    } else {
      setTabViewHeight(310);
    }
  };


  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default ExpensesSub;
