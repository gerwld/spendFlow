import React, { useEffect } from 'react';
import { Text, Platform, StyleSheet, View, Pressable, TextInput } from 'react-native';
import BottomSheetExperimental from './BottomSheetExperimental';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import { useCurrentTheme } from 'hooks';
import SegmentedControl from "react-native-segmented-control-2";
import ActionSheetExperimental from './ActionSheetExperimental';
import { LineItemView } from '@components';
import { ArrowBigDownDash, EthernetPort, Landmark, LucideApple, LucideBookHeart, LucideCalendar, LucideCat, LucidePlus, LucidePopcorn, LucideTrain, PenBoxIcon, ShieldCheck } from 'lucide-react-native';

const isFirstPlusOrMinus = (value) => value[0] === "-" || value[0] === "+"

const categoriesArray = [
  { id: 1, title: 'Entertainment', icon: <LucidePopcorn stroke="#ff3939" />, iconColor: '#ff3939' },
  { id: 2, title: 'Groceries', icon: <LucideApple stroke="#3988ff" />, iconColor: '#3988ff' },
  { id: 3, title: 'Education', icon: <LucideBookHeart stroke="#ff8c39" />, iconColor: '#ff8c39' },
];


const AddOperationSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const [index, setIndex] = React.useState(0);
  const getActionColor = () => index === 0 ? "red" : index === 1 ? "green" : "textColor";

  // currency change / show modal state
  const [isShowCurrency, setShowCurrency] = React.useState(false)
  const [currency, setCurrency] = React.useState("PLN")

  // main input state
  const [numberValue, setNumberValue] = React.useState("");

  const toggleCurrency = () => {
    setShowCurrency(!isShowCurrency)
  }

  // changes +-0 to +-0 current
  useEffect(() => {
    let isFirst = isFirstPlusOrMinus(numberValue);
    let newValue = isFirst ? numberValue.slice(1) : numberValue;
    let firstChar = index === 0 ? "-" : index === 1 ? "+" : "";

    if (newValue === "")
      setNumberValue("");

    else setNumberValue(firstChar + newValue)
  }, [index])

  const onChangeNumber = (value) => {
    const regex = /^[+-]?[0123456789.,]*$/;
    const isValid = regex.test(value);
    let isFirst = isFirstPlusOrMinus(value);

    if (isValid) {
      // first with +- cannot be 0
      if (value[0] === "0" || value[1] === "0" && isFirst) {
        setNumberValue("")
      };

      // cannot be empty
      if (value === "-" || value === "+" || !value || value === "") {
        setNumberValue("")
        return
      }

      // only one divider
      if (value.split("").filter(e => e === "," || e === ".").length > 1) return;


      // add plus or minus
      if (index === 0 && !isFirst) {
        setNumberValue("-" + value)
      }
      else if (index === 1 && !isFirst) {
        setNumberValue("+" + value)
      }
      // else return normal
      else setNumberValue(value)
    }
  }

  const styles = StyleSheet.create({
    tabs: {
      flex: 1,
      width: "100%",
      backgroundColor: themeColors.activeArea
    },
    tab: {
      marginRight: -1,
      height: 48,
    },
    selectedTab: {
      margin: 5,
      borderRightColor: "transparent",
      borderRightWidth: 0,
      backgroundColor: themeColors.topBarBackgroundActive,
      color: themeColors.textColorHighlight
    },
    tabText: {
      fontSize: 15,
      color: themeColors.textColorHighlight
    },
    valueBlock: {
      alignItems: 'center',
      flexDirection: "row",
      justifyContent: 'center',
      padding: 8,
      marginTop: 12,
      borderRadius: 10,
      backgroundColor: themeColors.activeArea,
    },
    currencyBTN: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      height: 45,
      marginVertical: 2,
      marginLeft: 5,
      minWidth: 70,
      borderRadius: 6,
      overflow: "hidden",
      backgroundColor: themeColors.tabsActiveColor
    },
    currencyBTNText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    numberInput: {
      height: 45,
      flex: 1,
      fontSize: 30,
      paddingHorizontal: 15,
      color: themeColors[getActionColor()],
      fontWeight: "500",
      textAlign: "right",
    },
    selectItemText: {
      fontSize: 16,
      color: themeColors.textColor
    },
    extraGap: {
      marginTop: 20
    },
    itemViewIcon: {
      marginRight: 14
    }
  });

  const renderContent = (
    <ScrollView style={{ height: "100%" }}>
      <SegmentedControl
        gap={5}
        textStyle={styles.tabText}
        activeTextColor={themeColors.textColorHighlight}
        tabStyle={styles.tab}
        selectedTabStyle={styles.selectedTab}
        style={styles.tabs}
        tabs={["Expense", "Income", "Transfer"]}
        onChange={setIndex}
        value={index}
      />

      <View style={styles.valueBlock}>
        <Pressable style={styles.currencyBTN} onPress={toggleCurrency}>
          <Text style={styles.currencyBTNText}>{currency}</Text>
        </Pressable>
        <TextInput
          {...{
            placeholder: index === 0 ? "-0" : index === 1 ? "+0" : "0",
            placeholderTextColor: themeColors[getActionColor()],
            maxLength: 10,
            keyboardType: "numeric",
            style: styles.numberInput,
            value: numberValue,
            onChangeText: onChangeNumber
          }} />
      </View>
      <View style={[styles.valueBlock, styles.extraGap]}>
        <Pressable style={{ width: "100%" }} onPress={() => openURL('https://docs.google.com/forms/d/e/1FAIpQLSd2chzzyUdExwXJXpBCHVP3JnU8nUETBQbe54DWoMWbHBHT_g/viewform?usp=sf_link')}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon 
              {...{...categoriesArray[2],
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }}/>
            <Text style={styles.selectItemText}>Select Account</Text>
          </LineItemView>
        </Pressable>
      </View>
      <View style={styles.valueBlock}>
        <Pressable style={{ width: "100%" }} onPress={() => openURL('https://docs.google.com/forms/d/e/1FAIpQLSd2chzzyUdExwXJXpBCHVP3JnU8nUETBQbe54DWoMWbHBHT_g/viewform?usp=sf_link')}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon 
              {...{...categoriesArray[0],
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }}/>
            <Text style={styles.selectItemText}>Select Category</Text>
          </LineItemView>
        </Pressable>
      </View>
      <View style={styles.valueBlock}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
          <ItemViewIcon 
              {...{
                icon: <LucideCalendar stroke={themeColors.textColor} width={25} height={25}/>,
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }}/>
            
            <Text style={styles.selectItemText}>Friday, 16 February</Text>
          </LineItemView>
      </View>

      <View style={styles.valueBlock}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
          <ItemViewIcon 
              {...{
                icon: <PenBoxIcon stroke={themeColors.textColor} width={24} height={24}/>,
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }}/>
            
            <Text style={styles.selectItemText}>Add Title</Text>
            <Text style={[styles.selectItemText, {opacity: 0.5, marginLeft: 2}]}> (not required)</Text>
          </LineItemView>
      </View>

      <ActionSheetExperimental {...{
        value: currency,
        isOpen: isShowCurrency,
        toggleSheet: toggleCurrency,
        onSelect: setCurrency,
        options: [
          { label: 'PLN', subLabel: "(Polish Złoty)" },
          { label: 'USD', subLabel: "(US Dollar)" },
          { label: 'EUR', subLabel: "(Euro)" },
          { label: 'UAH', subLabel: "(Ukraininan Hryvnia)" },
        ]
      }} />
    </ScrollView>
  )













  return Platform.OS === "ios" || Platform.OS === "web" || true

    ? <BottomSheetExperimental
      {...{
        title: "Add operation",
        isOpen, toggleSheet,
        rightButton: {title: "Save", onPress: () => alert("save pressed.")},
        backgroundColor: themeColors.bgHighlight
      }}>
      {renderContent}
    </BottomSheetExperimental>

    : <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheet>

}


const ItemViewIcon = ({icon, iconColor, defBackground, theme}) => {
  
  const styles = StyleSheet.create({
    icon: {
      width: 45,
      height: 45,
      marginRight: 10,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      overflow: "hidden"
    },
    icon_bg: {
      position: "absolute",
      ...StyleSheet.absoluteFill,
      backgroundColor: iconColor || defBackground,
      zIndex: -1,
      opacity: iconColor ? (theme === "dark" ? 0.2 : 0.1) : 1,
    },
  });

  return (
    <View style={styles.icon}>
      {icon}
      <View style={styles.icon_bg}/>
    </View>
  )
  
}


export default AddOperationSheet