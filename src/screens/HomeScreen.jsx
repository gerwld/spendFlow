import React from "react";
import { HomeHeader } from "@components";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useCurrentTheme } from "hooks";
import { ScrollView } from "react-native-gesture-handler";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";
import { LucideBriefcaseBusiness, LucideHandCoins, LucideLandmark, LucidePlus, LucideWallet } from "lucide-react-native";
import SearchAndFilter from "src/components/SearchAndFilter";
import OperationsItem from "src/components/items/OperationsItem";
import AddOperationSheet from "src/components/sheets/AddOperationSheet";
import { operationsSelectors } from "@redux";
import { shallowEqual, useSelector } from "react-redux";
import { getWeekdays } from "@constants";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  block: {
    width: Math.min(width - 30, 1000),
    alignSelf: "center",
    flexDirection: 'row',
    gap: 2,
    minHeight: 76,
    maxWidth: 360,
    marginTop: 5,
    marginHorizontal: 19,
    // marginBottom: 10,
    padding: 7,
    borderRadius: 10,
    shadowColor: "#000000",
    zIndex: 100,

    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
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
  subText: {
    fontSize: 18,
    lineHeight: 18,
    marginTop: 3,
    fontWeight: '400',
    paddingTop: 2,
    
  },
  subTextExpense: { color: '#db4263' },
  subTextBalance: { color: '#4de971' },
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
    block: [styles.block, { backgroundColor: themeColors.background }],
    subTextBalance: {color: themeColors.textColor},
    headerText: [styles.headerText, { color: themeColors.textColor }],
  }), [themeColors]);
  
  return (
    <>
      <HeaderSaturated navigation={navigation} />
      <InfiniteCalendar
        renderHeader={() => 
          <View style={memoizedStyles.block}>
            <View style={styles.child}>
              <Text style={memoizedStyles.headerText}>Expenses</Text>
              <Text style={[styles.subText, styles.subTextExpense]}>400 PLN</Text>
            </View>
            <View style={styles.child}>
              <Text style={memoizedStyles.headerText}>Balance</Text>
              <Text style={[styles.subText, styles.subTextBalance]}>400 PLN</Text>
            </View>
            <View style={styles.child}>
              <Text style={memoizedStyles.headerText}>Income</Text>
              <Text style={[styles.subText, memoizedStyles.subTextBalance]}>400 PLN</Text>
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
    <AddOperationSheet isOpen={isSheetOpen} toggleSheet={toggleSheet} />
  </>
}


const LastOperations = ({ calendarDate, calendarIndex }) => {
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
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
  
    },
    noDataText: {
      fontSize: 18,
      fontWeight: "400",
      color: themeColors.textColor,
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
