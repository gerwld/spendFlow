import React from 'react';
import { Text, Platform, StyleSheet, View } from 'react-native';
import BottomSheetExperimental from './BottomSheetExperimental';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import { useCurrentTheme } from 'hooks';
import SegmentedControl from "react-native-segmented-control-2";
import { ActionSheet, Button, PanningProvider, Picker, Typography } from 'react-native-ui-lib';
import ActionSheetExperimental from './ActionSheetExperimental';

const AddOperationSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const [index, setIndex] = React.useState(0)
  const [isShowCurrency, setShowCurrency] = React.useState(false)
  const [currency, setCurrency] = React.useState("PLN")

  const toggleCurrency = () => {
    setShowCurrency(!isShowCurrency)
  }
  
  const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    width: "100%",
    backgroundColor: themeColors.monthGeneral
  },
  tab: {
    marginRight: -1,
    height: 40,
  },
  selectedTab: {
    borderRightColor: "transparent",
    borderRightWidth: 0
  },
  tabText: {
    fontSize: 15,
    color: themeColors.textColorHighlight
  },
  valueBlock: {
    flexDirection: "row",
  }
  });

  const options = [
    {label: 'JavaScript', value: 'js', labelStyle: Typography.text65},
    {label: 'Java', value: 'java', labelStyle: Typography.text65},
    {label: 'Python', value: 'python', labelStyle: Typography.text65},
    {label: 'C++', value: 'c++', disabled: true, labelStyle: Typography.text65},
    {label: 'Perl', value: 'perl', labelStyle: Typography.text65}
  ];
  

  const renderContent = (
    <ScrollView>
      <SegmentedControl
      textStyle={styles.tabText}
      tabStyle={styles.tab}
      selectedTabStyle={styles.selectedTab}
      style={styles.tabs}
        tabs={["Expense", "Income", "Transfer"]}
        onChange={setIndex}
        value={index}
      />

      <View style={styles.valueBlock}>
      <Button onPress={toggleCurrency}>
        <Text>{currency}</Text>
        </Button>

      <ActionSheetExperimental {...{
        value: currency,
        isOpen: isShowCurrency,
        toggleSheet: toggleCurrency,
        onSelect: setCurrency,
        options: [
          {label: 'PLN', subLabel: "(Polish Złoty)"},
          {label: 'USD', subLabel: "(US Dollar)"},
          {label: 'EUR', subLabel: "(Euro)"},
          {label: 'UAH',subLabel: "(Ukraininan Hryvnia)"},
        ]
      }}/>
      </View>
    </ScrollView>
  )















  return Platform.OS === "ios" || Platform.OS === "web"

    ? <BottomSheetExperimental 
        {...{
          title: "Add operation",
          isOpen, toggleSheet,
          backgroundColor: themeColors.bgHighlight
        }}>
      {renderContent}
    </BottomSheetExperimental>

    : <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheet>

}


export default AddOperationSheet