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
import { PageExpensesOrIncomes } from 'src/screens/home/MonthGeneral';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { categoriesSelectors } from '@redux';
import { useSelector } from 'react-redux';

const TIMESTAMP_TODAY = new Date().setHours(0,0,0,0);
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

  const [sheetState, setSheetState] = React.useState({
    tab: 0,
    isCurrencySheet: false,
    isAccountSheet: false,
    isCategorySheet: false,
    isCalendarSheet: false,
    isTitleSheet: false,
  })

  const [state, setState] = React.useState({
    value: "",
    currency: "USD",
    accountID: null,
    categoryID: null,
    timestamp: TIMESTAMP_TODAY,
    title: null,
  })

  const onSubmit =() => {
    // ~65ms in assign benchmark (removes Object.proto)
    const cleanObj = Object.create(null);
    Object.assign(cleanObj, state);
    Object.assign(cleanObj, { id: uuid.v4() });
    d(categoriesActions.addCatergory(cleanObj));

    setSheetState(initialState);
    navigation.navigate('overview_tab')
  }


  const dispatchSheetAction = (key, value) => 
    setSheetState(produce(draft => {
      draft[key] = value;
    }));

  const dispatchStateAction = (key, value) => 
    setState(produce(draft => {
      draft[key] = value;
    }));




  // SHEET ACTIONS
  
  const toggleCurrency = () => 
    dispatchSheetAction("isCurrencySheet", !sheetState.isCurrencySheet)
  
  const toggleCalendar = () => 
    dispatchSheetAction("isCalendarSheet", !sheetState.isCalendarSheet)
  
  const toggleAccount = () => 
    dispatchSheetAction("isAccountSheet", !sheetState.isAccountSheet)
  
  const toggleCategory = () => 
    dispatchSheetAction("isCategorySheet", !sheetState.isCategorySheet)
  
  const toggleTitle = () => 
    dispatchSheetAction("isTitleSheet", !sheetState.isTitleSheet)
  
  const setIndex = (payload) => 
    dispatchSheetAction("tab", payload)



  // STATE ACTIONS

  const setCurrency = (payload) => 
    dispatchStateAction("currency", payload)

  const setAccountID = (payload) => 
    dispatchStateAction("accountID", payload)

  const setCategoryID = (payload) => 
    dispatchStateAction("categoryID", payload)

  const setDateTimestamp = (payload) => 
    dispatchStateAction("timestamp", payload)
  
  const setTitle = (payload) => 
    dispatchStateAction("title", payload)

  const getActionColor = () => sheetState.tab === 0 ? "red" : sheetState.tab === 1 ? "green" : "textColor";




  // changes +-0 to +-0 current
  useEffect(() => {
    let isFirst = isFirstPlusOrMinus(state.value);
    let newValue = isFirst ? state.value.slice(1) : state.value;
    let firstChar = sheetState.tab === 0 ? "-" : sheetState.tab === 1 ? "+" : "";

    if (newValue === "")
      dispatchStateAction("value", "");

    else dispatchStateAction("value", firstChar + newValue);
  }, [sheetState.tab])

  const onChangeNumber = (value) => {
    const regex = /^[+-]?[0123456789.,]*$/;
    const isValid = regex.test(value);
    let isFirst = isFirstPlusOrMinus(value);

    if (isValid) {
      // first with +- cannot be 0
      if (value[0] === "0" || value[1] === "0" && isFirst) {
        dispatchStateAction("value", "");
      };

      // cannot be empty
      if (value === "-" || value === "+" || !value || value === "") {
        dispatchStateAction("value", "");
        return
      }

      // only one divider
      if (value.split("").filter(e => e === "," || e === ".").length > 1) return;

      // add plus or minus
      if (sheetState.tab === 0 && !isFirst) {
        dispatchStateAction("value", "-" + value);
      }
      else if (sheetState.tab === 1 && !isFirst) {
        dispatchStateAction("value", "+" + value);
      }
      // else return normal
      else dispatchStateAction("value", value);
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
      marginTop: 12,
      marginLeft: -2,
      borderRadius: 10,
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
    selectItemTextValue: {
      fontSize: 17,

      marginLeft: "auto",
      marginRight: 7,
      color: themeColors.chevronText
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
        value={sheetState.tab}
      />

      <View style={styles.valueBlock}>
        <Pressable style={styles.currencyBTN} onPress={toggleCurrency}>
          <Text style={styles.currencyBTNText}>{state.currency}</Text>
        </Pressable>
        <TextInput
          {...{
            placeholder: sheetState.tab === 0 ? "-0" : sheetState.tab === 1 ? "+0" : "0",
            placeholderTextColor: themeColors[getActionColor()],
            maxLength: 10,
            keyboardType: "numeric",
            style: styles.numberInput,
            value: state.value,
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
            <Text style={styles.selectItemText}>Account</Text>
            <RenderValueCategory itemID={state.accountID} style={styles.selectItemTextValue}/>
        
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
            <Text style={styles.selectItemText}>Category</Text>
            <RenderValueCategory itemID={state.categoryID} style={styles.selectItemTextValue}/>
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

            <Text style={styles.selectItemText}>Date</Text>
            <ReanderValueCalendar timestamp={state.timestamp} style={styles.selectItemTextValue}/>
            
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

            <Text style={styles.selectItemText}>Description</Text>
            <Text style={styles.selectItemTextValue}>{typeof state.title === "string" ? state.title.truncate(12) : "(not required)"}</Text>
          </LineItemView>
        </Pressable>
      </View>


      {/* ----------------------------- SHEETS PART ---------------------------- */}
      <ActionSheetExperimental {...{
        value: state.currency,
        isOpen: sheetState.isCurrencySheet,
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
          isOpen: sheetState.isCalendarSheet,
          toggleSheet: toggleCalendar,
          onPress: setDateTimestamp,
          current: state.timestamp,
        }} />

      <AccountSheet
        {...{
          isOpen: sheetState.isAccountSheet,
          toggleSheet: toggleAccount
        }} />

      <CategorySheet
        {...{
          isOpen: sheetState.isCategorySheet,
          toggleSheet: toggleCategory,
          onPress: setCategoryID,
          current: state.categoryID
        }} />
      <TitleSheet
        {...{
          isOpen: sheetState.isTitleSheet,
          toggleSheet: toggleTitle,
          onSubmit: setTitle
        }} />
    </ScrollView>
  )



  return Platform.OS === "ios" || Platform.OS === "web" || true

    ? <BottomSheetExperimental
      {...{
        title: "Add operation",
        isOpen, toggleSheet,
        setHeight: Platform.OS === "android" ? screenHeight - 50 : screenHeight - 100,
        rightButton: { title: "Save", onPress: onSubmit },
        backgroundColor: themeColors.bgHighlight
      }}>
      {renderContent}
    </BottomSheetExperimental>

    : <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} backgroundColor={themeColors.bgHighlight}>
      {renderContent}
    </BottomSheet>

}

const RenderValueAccount = ({ itemID, style }) => {
  if (itemID) {
    const category = useSelector(state => categoriesSelectors.selectCategoryByID(state, itemID));
    return <Text style={style}>{category.title}</Text>
  }
  return <Text style={style}>Not selected</Text>;
}

const RenderValueCategory = ({ itemID, style }) => {
  if (itemID) {
    const category = useSelector(state => categoriesSelectors.selectCategoryByID(state, itemID));
    return <Text style={style}>{category?.title}</Text>
  }
  return <Text style={style}>Not selected</Text>;
}

const ReanderValueCalendar = ({timestamp, style}) => {
  return <Text style={style}>{timestamp}</Text>
}


const TitleSheet = ({ isOpen, toggleSheet, onSubmit }) => {
  const [themeColors] = useCurrentTheme();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);

  const onTitleSubmit = () => {
    if(onSubmit) {
      onSubmit(value);
      toggleSheet()
    }
  }

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
        rightButton: { title: "Save", onPress: onTitleSubmit },
        setFullWidth: true,
        maxHeightMultiplier: Platform.OS === "android" ? 0.54 : 0.52,
        setHeight: 300,
        scrollable: true,
        title: "Description",
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

const CategorySheet = ({ isOpen, toggleSheet, onPress, current }) => {
  const [themeColors] = useCurrentTheme();
  const {bottom} = useSafeAreaInsets()


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

      <ScrollView contentContainerStyle={{paddingBottom: bottom + 10}}>
        <PageExpensesOrIncomes onPress={onPress} currentItem={current}/>
      </ScrollView>

    </BottomSheetExperimental>
  )
}

const CalendarSheet = ({ isOpen, toggleSheet, current, onPress }) => {
  const [themeColors] = useCurrentTheme();
  const [value, setValue] = React.useState([current]);

  const onDayPress = (timestamp) => {     
    setValue([timestamp]);
    onPress && onPress(timestamp);
  }

  const renderCalendar = (
    <Calendar
    key={value[0]}
    borderColor={themeColors.calendarBorderColor}
    color={themeColors.textColor}
    colorContrast={themeColors.textColorHighlight}
    data={value}
    itemID={null}
    activeColor={themeColors.tabsActiveColor}
    onChange={onDayPress} />
  )

  return (
    <BottomSheet
      {...{
        leftButton: { title: "Back", onPress: toggleSheet },
        rightButton: { title: "Save", onPress: toggleSheet },
        setFullWidth: true,
        maxHeightMultiplier: 0.50,
        setHeight: 410,
        scrollable: true,
        title: "Select Date",
        isOpen, toggleSheet,
        backgroundColor: themeColors.bgHighlight
      }}>
        {value && renderCalendar}
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