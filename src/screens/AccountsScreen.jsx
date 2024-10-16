import React from "react";
import { BaseView, HomeHeader, IconGlob } from "@components";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useCurrentTheme } from "hooks";
import { Platform, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import AccountItem from "src/components/items/AccountItem";
import StatBlock from "src/components/StatBlock";
import { getGreenRedOrGray, HEADER_SHADOW } from "@constants";
import { useNavigation } from "@react-navigation/native";
import { shallowEqual, useSelector } from "react-redux";
import { accountsSelectors } from "@redux";

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 22,
  },
  headerText: {
    fontSize: 19,
  },
  subitems: {
    gap: 12,
    marginBottom: 5,
    marginHorizontal: 20
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
    // width: 10,
    height: 3,
    // marginBottom: 8,
  },
});


const AccountsScreen = ({ navigation }) => (
  <BaseView>
    <HomeHeader navigation={navigation} />
    <AccountsOrTotalTabs />
  </BaseView>
);

const AccountsSubscreen = ({ balance = -200, balanceSavings = 0 }) => {
  const navigation = useNavigation();
  const [themeColors] = useCurrentTheme();
  const {accounts, accountsArray} = useSelector(state => accountsSelectors.selectAccountsAndIDs(state), shallowEqual)

  const onAddNewPress = () => {
    navigation.navigate("setaccount")
  }

  const renderAddNew = (
    <AccountItem
    {...{    
      onPress: onAddNewPress,  
      icon: <IconGlob size={28} {...{name: "Plus", color: "#ced2de"}} />,
      isAddNew: true,
      title: "Add Account"
    }}/>
  )

  return (
    <ScrollView>
      <SectionHeader title="Accounts" balance={balance} themeColors={themeColors} />
      <View style={styles.subitems}>
        {accountsArray.length  
          ? accountsArray.map(itemID => 
            <AccountItem {...{
              key: itemID,
              title: accounts[itemID].title,
              iconColor: accounts[itemID].color,
              icon: <IconGlob name={accounts[itemID].icon} color={accounts[itemID].color} size={24}/>
            }} />) 
          : null}
        {renderAddNew}
      </View>
      <SectionHeader title="Savings" balance={balanceSavings} themeColors={themeColors} />
      <View style={styles.subitems}>
        <AccountItem title="Lorem Item" />
       {renderAddNew}
      </View>
    </ScrollView>
  );
};

const TotalSubscreen = () => {
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


const SectionHeader = ({ title, balance, themeColors }) => (
  <View style={styles.header}>
    <Text style={[styles.headerText, { color: themeColors.textColorHighlight }]}>{title}</Text>
    {balance !== undefined && (
      <Text style={[styles.headerText, getGreenRedOrGray(balance, themeColors)]}>{balance} PLN</Text>
    )}
  </View>
);





// TABS PART 

const renderScene = SceneMap({
  accounts: AccountsSubscreen,
  total: TotalSubscreen,
});

const AccountsOrTotalTabs = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "accounts", title: "Savings" },
    { key: "total", title: "Debts" },
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
      indicatorStyle={[styles.indicatorStyle, { backgroundColor: themeColors.tabsActiveColor, }]}
      style={[styles.tabBarStyle, { backgroundColor: themeColors.background, borderTopColor: themeColors.borderColorTh, borderBottomColor: themeColors.borderColorTh }]}
    />
  );
};

export default AccountsScreen;
