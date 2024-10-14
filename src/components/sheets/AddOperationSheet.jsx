import React, { useEffect } from 'react';
import { Text, Platform, StyleSheet, View, Pressable, TextInput, Dimensions } from 'react-native';
import BottomSheetExperimental from './BottomSheetExperimental';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';
import { useCurrentTheme } from 'hooks';
import SegmentedControl from "react-native-segmented-control-2";
import ActionSheetExperimental from './ActionSheetExperimental';
import { LineItemView, Calendar } from '@components';
import { LucideCalendar, PenBoxIcon } from 'lucide-react-native';
import { produce } from 'immer';
import CategoryItem from '../items/CategoryItem';
import { LucideApple, LucidePopcorn, LucidePlus, LucideBookHeart, LucideTrain, LucideCat, Landmark, ShieldCheck, ArrowBigDownDash, EthernetPort } from 'lucide-react-native';


const { height: screenHeight } = Dimensions.get("screen")
const isFirstPlusOrMinus = (value) => value[0] === "-" || value[0] === "+"

const accountsArray = [
  { id: 1, title: 'Entertainment', icon: <LucidePopcorn stroke="#ff3939" />, iconColor: '#ff3939' },
  { id: 2, title: 'Groceries', icon: <LucideApple stroke="#3988ff" />, iconColor: '#3988ff' },
  { id: 3, title: 'Education', icon: <LucideBookHeart stroke="#ff8c39" />, iconColor: '#ff8c39' },
  { id: 10, title: 'Add new', icon: <LucidePlus stroke="#b3b9bf" />, iconColor: '#b3b9bf', isAddNew: true },
];

const categoriesArray = [
  { id: 1, title: 'Entertainment', icon: <LucidePopcorn stroke="#ff3939" />, iconColor: '#ff3939' },
  { id: 2, title: 'Groceries', icon: <LucideApple stroke="#3988ff" />, iconColor: '#3988ff' },
  { id: 3, title: 'Education', icon: <LucideBookHeart stroke="#ff8c39" />, iconColor: '#ff8c39' },
  { id: 4, title: 'Transport', icon: <LucideTrain stroke="#39ff6e" />, iconColor: '#39ff6e' },
  { id: 5, title: 'Savings', icon: <Landmark stroke="#3999ff" />, iconColor: '#3999ff' },
  { id: 6, title: 'Pets', icon: <LucideCat stroke="#decd36" />, iconColor: '#decd36' },
  { id: 7, title: 'Debt Payments', icon: <ArrowBigDownDash stroke="#ff39ff" />, iconColor: '#ff39ff' },
  { id: 8, title: 'Insurance', icon: <ShieldCheck stroke="#31e2cd" />, iconColor: '#31e2cd' },
  { id: 9, title: 'Subscriptions', icon: <EthernetPort stroke="#5236f4" />, iconColor: '#5236f4' },
  { id: 10, title: 'Add new', icon: <LucidePlus stroke="#b3b9bf" />, iconColor: '#b3b9bf', isAddNew: true },
];

const accStyles = StyleSheet.create({
  pageExpensesContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 12,
    marginHorizontal: 15,
  },
});


const AddOperationSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const [index, setIndex] = React.useState(0);
  const [state, setState] = React.useState({
    operationValue: "",
    operationCurrency: "USD",
    tabIndex: 0,
    isCurrencySheet: false,
    isAccountSheet: false,
    isCategorySheet: false,
    isCalendarSheet: false,
    isTitleSheet: false,
  })

  const dispatchLocalAction = (key, value) => {
    setState(produce(draft => {
      draft[key] = value;
    }));
  }
  const toggleCurrency = () => {
    dispatchLocalAction("isCurrencySheet", !state.isCurrencySheet)
  }
  const toggleCalendar = () => {
    dispatchLocalAction("isCalendarSheet", !state.isCalendarSheet)
  }
  const toggleAccount = () => {
    dispatchLocalAction("isAccountSheet", !state.isAccountSheet)
  }
  const toggleCategory = () => {
    dispatchLocalAction("isCategorySheet", !state.isCategorySheet)
  }
  const toggleTitle = () => {
    dispatchLocalAction("isTitleSheet", !state.isTitleSheet)
  }
  const setCurrency = (payload) => {
    dispatchLocalAction("operationCurrency", payload)
  }

  const getActionColor = () => index === 0 ? "red" : index === 1 ? "green" : "textColor";

  // changes +-0 to +-0 current
  useEffect(() => {
    let isFirst = isFirstPlusOrMinus(state.operationValue);
    let newValue = isFirst ? state.operationValue.slice(1) : state.operationValue;
    let firstChar = index === 0 ? "-" : index === 1 ? "+" : "";

    if (newValue === "")
      dispatchLocalAction("operationValue", "");

    else dispatchLocalAction("operationValue", firstChar + newValue);
  }, [index])

  const onChangeNumber = (value) => {
    const regex = /^[+-]?[0123456789.,]*$/;
    const isValid = regex.test(value);
    let isFirst = isFirstPlusOrMinus(value);

    if (isValid) {
      // first with +- cannot be 0
      if (value[0] === "0" || value[1] === "0" && isFirst) {
        dispatchLocalAction("operationValue", "");
      };

      // cannot be empty
      if (value === "-" || value === "+" || !value || value === "") {
        dispatchLocalAction("operationValue", "");
        return
      }

      // only one divider
      if (value.split("").filter(e => e === "," || e === ".").length > 1) return;

      // add plus or minus
      if (index === 0 && !isFirst) {
        dispatchLocalAction("operationValue", "-" + value);
      }
      else if (index === 1 && !isFirst) {
        dispatchLocalAction("operationValue", "+" + value);
      }
      // else return normal
      else dispatchLocalAction("operationValue", value);
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
      fontSize: 14,
      paddingBottom: Platform.OS === "android" ? 2 : 0,
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
    valueBlockSec: {
      alignItems: 'center',
      flexDirection: "row",
      justifyContent: 'center',
      // padding: 2,
      // paddingHorizontal: 6,
      marginTop: 12,
      marginLeft: -2,
      borderRadius: 10,
      // backgroundColor: themeColors.activeArea,
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
      fontSize: 17,
      color: themeColors.textColor
    },
    extraGap: {
      marginTop: 20
    },
    itemViewIcon: {
      marginRight: 14
    },
  
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
          <Text style={styles.currencyBTNText}>{state.operationCurrency}</Text>
        </Pressable>
        <TextInput
          {...{
            placeholder: index === 0 ? "-0" : index === 1 ? "+0" : "0",
            placeholderTextColor: themeColors[getActionColor()],
            maxLength: 10,
            keyboardType: "numeric",
            style: styles.numberInput,
            value: state.operationValue,
            onChangeText: onChangeNumber
          }} />
      </View>
      <View style={[styles.valueBlockSec, styles.extraGap]}>
        <Pressable style={{ width: "100%" }} onPress={toggleAccount}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon
              {...{
                ...categoriesArray[2],
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }} />
            <Text style={styles.selectItemText}>Select Account</Text>
          </LineItemView>
        </Pressable>
      </View>
      <View style={styles.valueBlockSec}>
        <Pressable style={{ width: "100%" }} onPress={toggleCategory}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon
              {...{
                ...categoriesArray[0],
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }} />
            <Text style={styles.selectItemText}>Select Category</Text>
          </LineItemView>
        </Pressable>
      </View>
      <View style={styles.valueBlockSec}>
        <Pressable style={{ width: "100%" }} onPress={toggleCalendar}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon
              {...{
                icon: <LucideCalendar stroke={themeColors.textColor} width={25} height={25} />,
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }} />

            <Text style={styles.selectItemText}>Friday, 16 February</Text>
          </LineItemView>
        </Pressable>
      </View>

      <View style={styles.valueBlockSec}>
        <Pressable style={{ width: "100%" }} onPress={toggleTitle}>
          <LineItemView isOperation pl1 isLastItem rightArrow>
            <ItemViewIcon
              {...{
                icon: <PenBoxIcon stroke={themeColors.textColor} width={24} height={24} />,
                defBackground: themeColors.bgHighlightSec,
                theme: themeColors.label
              }} />

            <Text style={styles.selectItemText}>Add Title</Text>
            <Text style={[styles.selectItemText, { opacity: 0.5, marginLeft: 2 }]}> (not required)</Text>
          </LineItemView>
        </Pressable>
      </View>


      {/* ----------------------------- SHEETS PART ---------------------------- */}
      <ActionSheetExperimental {...{
        value: state.operationCurrency,
        isOpen: state.isCurrencySheet,
        toggleSheet: toggleCurrency,
        onSelect: setCurrency,
        options: [
          { label: 'PLN', subLabel: "(Polish Złoty)" },
          { label: 'USD', subLabel: "(US Dollar)" },
          { label: 'EUR', subLabel: "(Euro)" },
          { label: 'UAH', subLabel: "(Ukraininan Hryvnia)" },
        ]
      }} />

      <CalendarSheet
        {...{
          isOpen: state.isCalendarSheet,
          toggleSheet: toggleCalendar
        }} />

      <AccountSheet
        {...{
          isOpen: state.isAccountSheet,
          toggleSheet: toggleAccount
        }} />

      <CategorySheet
        {...{
          isOpen: state.isCategorySheet,
          toggleSheet: toggleCategory
        }} />
      <TitleSheet
        {...{
          isOpen: state.isTitleSheet,
          toggleSheet: toggleTitle
        }} />
    </ScrollView>
  )



  return Platform.OS === "ios" || Platform.OS === "web" || true

    ? <BottomSheetExperimental
      {...{
        title: "Add operation",
        isOpen, toggleSheet,
        setHeight: Platform.OS === "android" ? screenHeight - 50 : screenHeight - 100,
        rightButton: { title: "Save", onPress: () => alert("save pressed.") },
        backgroundColor: themeColors.bgHighlight
      }}>
      {renderContent}
    </BottomSheetExperimental>

    : <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheet>



}

const TitleSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const styles = StyleSheet.create({
    titleInput: {
      width: "100%",
      height: 45,
      maxHeight: 45,
      marginBottom: "auto",
      fontSize: 20,
      paddingHorizontal: 15,
      color: themeColors.textColor,
      fontWeight: "400",
      textAlign: "left",
    },
    valueBlock: {
      alignItems: 'center',
      flexDirection: "row",
      justifyContent: 'center',
      padding: 4,
      marginTop: 4,
      marginHorizontal: 20,
      borderRadius: 10,
      backgroundColor: themeColors.activeArea,
    },
  });


  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);

      return () => clearTimeout(timer); // Cleanup timer if the component is unmounted or isOpen changes
    }
  }, [isOpen]);

  return (
    <BottomSheetExperimental
      {...{
        leftButton: { title: "Back", onPress: toggleSheet },
        rightButton: { title: "Save", onPress: () => alert("value: " + value) },
        setFullWidth: true,
        maxHeightMultiplier: Platform.OS === "android" ? 0.54 : 0.52,
        setHeight: 300,
        scrollable: true,
        title: "Add Title",
        isOpen,
        toggleSheet,
        backgroundColor: themeColors.bgHighlight
      }}>

      <View style={styles.valueBlock}>
        <TextInput
          ref={inputRef}
          placeholderTextColor={themeColors.placeholderColor}
          placeholder="New sneakers..."
          maxLength={50}
          style={styles.titleInput}
          value={value}
          onChangeText={setValue}
        />
      </View>

    </BottomSheetExperimental>
  );
};



const AccountSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();

  return (
    <BottomSheetExperimental
      {...{
        leftButton: { title: "Back", onPress: toggleSheet },
        setFullWidth: true,
        maxHeightMultiplier: 0.5,
        setHeight: 500,
        scrollable: true,
        title: "Select Account",
        isOpen, toggleSheet,
        backgroundColor: themeColors.bgHighlight
      }}>

      <View style={accStyles.pageExpensesContent}>
        {accountsArray.map(item => (
          <CategoryItem key={item.id} iconColor={item.iconColor} icon={item.icon} title={item.title} isRow />
        ))}
      </View>

    </BottomSheetExperimental>
  )
}

const CategorySheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();

  return (
    <BottomSheetExperimental
      {...{
        leftButton: { title: "Back", onPress: toggleSheet },
        setFullWidth: true,
        maxHeightMultiplier: 0.5,
        setHeight: 500,
        scrollable: true,
        title: "Select Category",
        isOpen, toggleSheet,
        backgroundColor: themeColors.bgHighlight
      }}>

      <View style={accStyles.pageExpensesContent}>
        {categoriesArray.map(item => (
          <CategoryItem key={item.id} iconColor={item.iconColor} icon={item.icon} title={item.title} isRow />
        ))}
      </View>

    </BottomSheetExperimental>
  )
}

const CalendarSheet = ({ isOpen, toggleSheet }) => {
  const [themeColors] = useCurrentTheme();
  const [value, setValue] = React.useState(null);

  const onDayPress = () => { }

  return (
    <BottomSheet
      {...{
        leftButton: { title: "Back", onPress: toggleSheet },
        rightButton: { title: "Save", onPress: () => alert("value: " + value) },
        setFullWidth: true,
        maxHeightMultiplier: 0.50,
        setHeight: 410,
        scrollable: true,
        title: "Select Date",
        isOpen, toggleSheet,
        backgroundColor: themeColors.bgHighlight
      }}>
      <Calendar
        borderColor={themeColors.calendarBorderColor}
        color={themeColors.textColor}
        colorContrast={themeColors.textColorHighlight}
        itemID={null}
        activeColor={themeColors.tabsActiveColor}
        onChange={onDayPress} />
    </BottomSheet>
  )
}





export const ItemViewIcon = ({ icon, iconColor, defBackground, theme }) => {

  const styles = StyleSheet.create({
    icon: {
      width: 45,
      height: 45,
      marginRight: 15,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
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
      <View style={styles.icon_bg} />
    </View>
  )

}


export default AddOperationSheet