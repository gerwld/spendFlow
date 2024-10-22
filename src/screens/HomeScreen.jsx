import React from "react";
import { HomeHeader } from "@components";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useCurrentTheme } from "hooks";
import { ScrollView } from "react-native-gesture-handler";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";
import { LucidePlus } from "lucide-react-native";
import OperationsItem from "src/components/items/OperationsItem";
import SetOperationSheet from "src/components/sheets/SetOperationSheet";
import { operationsSelectors } from "@redux";
import { shallowEqual, useSelector } from "react-redux";
import { getWeekdays } from "@constants";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainHeader: {
    width: Math.min(width - 30, 1000),
    alignSelf: "center",
    flexDirection: 'row',
    gap: 2,
    minHeight: 55,
    marginTop: 2,
    marginBottom: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: "#343A48",
    zIndex: 100,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1
  },

  child: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0
  },
  childActive: {
    borderRadius: 12,
  },
  headerText: {
    fontSize: 15,
    lineHeight: 15,
    marginTop: 2,
    fontWeight: "400",
  },
  mainHeaderText: {
    fontSize: 15,
    fontWeight: "600",
  },
  subText: {
    fontSize: 16.5,
    lineHeight: 16.5,
    fontWeight: '400',
    paddingTop: 3,
    
  },
  subTextExpense: { color: '#E11951' },
  subTextBalance: { color: '#19E18D' },
  
  pageExpensesContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 12,
    marginHorizontal: 15,
  },
});




const HomeScreen = ({ navigation }) => {
  const [themeColors] = useCurrentTheme();
  const memoizedStyles = React.useMemo(() => ({
    mainHeader: [styles.mainHeader, { backgroundColor: themeColors.mainHeaderBackgroundColor, borderColor: themeColors.mainHeaderBorderColor }],
    mainHeaderText: [styles.mainHeaderText, { color: themeColors.mainHeaderLabelColor }],
    subTextBalance: {color: themeColors.textColor},
    headerText: [styles.headerText, { color: themeColors.textColor }],
    subTextIncome: { color: themeColors.mainHeaderIncomeColor },
  }), [themeColors]);
  
  return (
    <>
      
      <InfiniteCalendar
        isGradient={true}
        renderTopHeader={() =>
          <HeaderSaturated navigation={navigation} />
        }
        renderHeader={() => 
          <View style={memoizedStyles.mainHeader}>
            <View style={styles.child}>
              <Text style={memoizedStyles.mainHeaderText}>Expenses</Text>
              <Text style={[styles.subText, styles.subTextExpense]}>-240 PLN</Text>
            </View>
            <View style={styles.child}>
              <Text style={memoizedStyles.mainHeaderText}>Balance</Text>
              <Text style={[styles.subText, styles.subTextBalance]}>240 PLN</Text>
            </View>
            <View style={styles.child}>
              <Text style={memoizedStyles.mainHeaderText}>Income</Text>
              <Text style={[styles.subText, memoizedStyles.subTextIncome]}>7200 PLN</Text>
            </View>
          </View>}>
        <LastOperations />
      </InfiniteCalendar>

    </>
  );
};

const HeaderSaturated = ({ navigation }) => {
  const [isSheetOpen, toggleSheetOpen] = React.useState(false);

  const toggleSheet = () => {
    toggleSheetOpen(!isSheetOpen);
  };

  const RightPress = (styles, stroke) => (
    <Pressable style={styles} onPress={toggleSheet}>
      <LucidePlus style={{ alignSelf: "center" }} stroke={stroke} height={34} width={34} />
    </Pressable>)

  return <>
    <HomeHeader navigation={navigation} rightChild={RightPress} />
    <SetOperationSheet isOpen={isSheetOpen} toggleSheet={toggleSheet} />
  </>
}


export const LastOperations = ({ calendarDate, calendarIndex }) => {
  const date = new Date(calendarDate)
  const Month = date.getMonth()
  const Year = date.getFullYear()
  const FirstDay = new Date(Year, Month, 1);
  const LastDay = new Date(Year, Month + 1, 0);
  const [themeColors] = useCurrentTheme();

  const MONTH_DAYS = Array.from({ length: LastDay.getUTCDate() }, (_, i) => i + 1).reverse()

  const firstDayTimestamp = FirstDay.setHours(0, 0, 0, 0);
  const lastDayTimestamp = LastDay.getTime();



  const { operations } = useSelector(state => operationsSelectors.selectOperationsAndIDs(state), shallowEqual)
  const operationsArray = useSelector(state => operationsSelectors.selectOperationsPortionMinMax(state, firstDayTimestamp, lastDayTimestamp), shallowEqual)
  const styles = StyleSheet.create({
    parent: {
      width: "100%",
      flex: 1,
    },
    content: {
      paddingBottom: 20
    },
    noData: {
      flex: 1,
      height: Math.max(height * 0.74 - 110, 200),
      minHeight: Math.max(height * 0.74 - 110, 200),
      alignItems: 'center',
      justifyContent: 'center',
    },
    noDataText: {
      fontSize: 17.5,
      fontWeight: "600",
      color: themeColors.chevronText,
      textAlign: "center"
    }
  });

  return (
    <View style={styles.parent}>
      <ScrollView
        contentContainerStyle={styles.content}
        >

        {/* <Text>Year: {Year}</Text>
        <Text>Month Index: {Month}</Text>
        <Text>First Day: {FirstDay.toISOString()}  {firstDayTimestamp}</Text>
        <Text>Last Day: {LastDay.toISOString()}  {lastDayTimestamp}</Text>
        <Text>Date: {calendarDate}</Text>
        <Text>Index: {calendarIndex}</Text> */}

        {MONTH_DAYS?.map(month_day => {
          const dayTimestamp = firstDayTimestamp + (86400000 * (month_day - 1));
          // Month === 9 && month_day === 15 && console.log(dayTimestamp);

          const dayItems = operationsArray
            .map(itemID => operations[itemID].timestamp === dayTimestamp ? operations[itemID] : null)
            .filter(e => e !== null)

          // dayItems.length && console.log(dayItems);

          if (dayItems.length) return (
            <DaySection key={dayTimestamp} timestamp={dayTimestamp}>
              {dayItems?.map(item =>
                <OperationsItem key={item.id} item={item} />
              )}

            </DaySection>
          )
        })}

        {operationsArray.length === 0 ? <View style={styles.noData}><Text style={styles.noDataText}>No data in specified range.</Text></View> : null}

      </ScrollView>
    </View>
  );
};

const DaySection = ({ children, timestamp }) => {
  const [themeColors] = useCurrentTheme();
  const dayString = new Date(timestamp);

  const styles = StyleSheet.create({
    block: {
      marginHorizontal: 19,
      marginTop: 10
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 5,
      borderBottomColor: themeColors.borderColorSec,
    },
    t: {
      color: themeColors.textColorHighlight,
      fontSize: 15,
    },
    tb: {
      color: themeColors.textColor,
      fontSize: 20,
    },
    th: {
      color: themeColors.textColor,
      fontSize: 15,
      marginLeft: 5
    },

  });

  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <Text style={styles.t}>{dayString.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</Text>
        <Text style={styles.th}>({getWeekdays()[getWeekdays().indexOf(dayString.toLocaleString('en-US', { weekday: 'long' }).toLowerCase())]})</Text>
      </View>

      <View>{children}</View>
    </View>
  );
};


export default HomeScreen;
