import React from "react";
import { BaseView, HomeHeader } from "@components";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useCurrentTheme } from "hooks";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import CategoryBlock from "src/components/CategoryBlock";
import StatBlock from "src/components/StatBlock";

const AccountsScreen = ({ navigation }) => {
  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      <AccountsOrTotalTabs />
    </BaseView>
  );
};


const getGreenRedOrGray =(val, styles) => {
 return {color: val > 0 ? styles.green : val == 0 ? styles.gray : styles.red}
}


const AccountsSubscreen = ({balance = -200, balanceSavings = 0}) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: 16
    
  },
  headerchild: {
  
  },
  t: {
    fontSize: 19,
    color: themeColors.textColorHighlight
  },
  th: {
    fontSize: 19
  },
  subitems: {
    flex: 0,
    gap: 15,
    margin: 12
  }
  });
  
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={[styles.t, styles.th]}>Accounts</Text>
        <Text style={[styles.t, getGreenRedOrGray(balance, themeColors) ]}>{balance} PLN</Text>
      </View>

      <View style={styles.subitems}>
      <CategoryBlock title="Card"/>
      <CategoryBlock title="Cash"/>
      <CategoryBlock addNewPressable title="Add financial account"/>
      </View>

      <View style={styles.header}>
        <Text style={[styles.t, styles.th]}>Savings</Text>
        <Text style={[styles.t, getGreenRedOrGray(balanceSavings, themeColors)]}>{balanceSavings} PLN</Text>
      </View>

      <View style={styles.subitems}>
      <CategoryBlock title="New car"/>
      <CategoryBlock addNewPressable title="Add new saving"/>
      </View>
    </ScrollView>
  )
}

const TotalSubscreen = ({balance = -200, balanceSavings = 0}) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 0,
    marginHorizontal: 16
    
  },
  t: {
    fontSize: 19,
    color: themeColors.textColorHighlight
  },
  th: {
    fontSize: 19,
  },
  subitems: {
    flex: 0,
    gap: 15,
    margin: 12
  }
  });
  
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={[styles.t, styles.th]}>Total</Text>
        {/* <Text style={[styles.t, getGreenRedOrGray(balance, themeColors) ]}>{balance} PLN</Text> */}
      </View>

      <View style={styles.subitems}>
        <StatBlock currency="PLN" value="-200"/>
      </View>

      <View style={styles.header}>
        <Text style={[styles.t, styles.th]}>Accounts</Text>
        {/* <Text style={[styles.t, getGreenRedOrGray(balanceSavings, themeColors)]}>{balanceSavings} PLN</Text> */}
      </View>

      <View style={styles.subitems}>
        <StatBlock currency="PLN" value="200"/>
      </View>
    </ScrollView>
  )
}









// TABS PART 


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

  const styles = StyleSheet.create({
    tabBarStyle: {
      backgroundColor: themeColors.background, 
      height: 52,
      marginTop: -5, 
      borderBottomWidth: 0,
    },
    tab: {
      fontSize: 15,
      fontWeight: '500',
      color: themeColors.textColor,
    },
    tabFocused: {
      color: themeColors.tabsActiveColor,
    },
    indicatorStyle: {
      backgroundColor: themeColors.tabsActiveColor,
      alignSelf: "center",
      width: 10,
      marginLeft: "24.5%",
      height: 5,
      borderRadius: 10,
      marginBottom: 4,
    }
  });

  return (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <TouchableOpacity activeOpacity={1}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.tab, focused && styles.tabFocused]}
        >
          {route.title}
        </Text>
        </TouchableOpacity>
      )}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
    />
  );
};

export default AccountsScreen;
