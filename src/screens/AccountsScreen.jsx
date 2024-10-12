import React, { useMemo } from "react";
import { BaseView, HomeHeader } from "@components";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useCurrentTheme } from "hooks";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import AccountItem from "src/components/items/AccountItem";
import StatBlock from "src/components/StatBlock";
import { HEADER_SHADOW } from "@constants";

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  headerText: {
    fontSize: 19,
  },
  subitems: {
    gap: 10,
    margin: 12,
  },
  tabBarStyle: {
    ...HEADER_SHADOW,
    height: 52,
    marginBottom: Platform.OS === "android" ? 10 : 0,
    borderBottomWidth: 0,
    elevation: 0,
    shadowColor: "transparent",
  },
  tab: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 2,
  },
  indicatorStyle: {
    alignSelf: "center",
    width: 10,
    height: 4,
    borderRadius: 10,
    marginBottom: 8,
    opacity: 0.5,
  },
});

const getGreenRedOrGray = (val, themeColors) => {
  return { color: val > 0 ? themeColors.green : val === 0 ? themeColors.gray : themeColors.red };
};

const SectionHeader = ({ title, balance, themeColors }) => (
  <View style={styles.header}>
    <Text style={[styles.headerText, { color: themeColors.textColorHighlight }]}>{title}</Text>
    {balance !== undefined && (
      <Text style={[styles.headerText, getGreenRedOrGray(balance, themeColors)]}>{balance} PLN</Text>
    )}
  </View>
);

const AccountsSubscreen = ({ balance = -200, balanceSavings = 0 }) => {
  const [themeColors] = useCurrentTheme();

  return (
    <ScrollView>
      <SectionHeader title="Accounts" balance={balance} themeColors={themeColors} />
      <View style={styles.subitems}>
        <AccountItem title="Card" />
        <AccountItem title="Cash" />
        <AccountItem addNewPressable title="Add financial account" />
      </View>
      <SectionHeader title="Savings" balance={balanceSavings} themeColors={themeColors} />
      <View style={styles.subitems}>
        <AccountItem title="New car" />
        <AccountItem addNewPressable title="Add new saving" />
      </View>
    </ScrollView>
  );
};

const TotalSubscreen = ({ balance = -200 }) => {
  const [themeColors] = useCurrentTheme();

  return (
    <ScrollView>
      <SectionHeader title="Total" themeColors={themeColors} />
      <View style={styles.subitems}>
        <StatBlock currency="PLN" value="-200" />
      </View>
      <SectionHeader title="Accounts" themeColors={themeColors} />
      <View style={styles.subitems}>
        <StatBlock currency="PLN" value="200" />
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  accounts: AccountsSubscreen,
  total: TotalSubscreen,
});

const AccountsOrTotalTabs = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "accounts", title: "Accounts" },
    { key: "total", title: "Total" },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
    />
  );
};

const renderTabBar = (props) => {
  const [themeColors] = useCurrentTheme();

  return (
    <TabBar
      {...props}
      pressColor="transparent"
      renderLabel={({ route, focused }) => (
        <TouchableOpacity activeOpacity={1}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.tab, { color: focused ? themeColors.tabsActiveColor : themeColors.textColorHighlight }]}
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      )}
      indicatorStyle={[styles.indicatorStyle, { backgroundColor: themeColors.tabsActiveColor, marginLeft: "24.5%" }]}
      style={[styles.tabBarStyle, { backgroundColor: themeColors.background, borderTopColor: themeColors.borderColorTh, borderBottomColor: themeColors.borderColorTh }]}
    />
  );
};

const AccountsScreen = ({ navigation }) => (
  <BaseView>
    <HomeHeader navigation={navigation} />
    <AccountsOrTotalTabs />
  </BaseView>
);

export default AccountsScreen;
