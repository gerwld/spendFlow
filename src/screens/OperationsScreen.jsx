import React from "react";
import { HomeHeader } from "@components";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCurrentTheme } from "hooks";
import { ScrollView } from "react-native-gesture-handler";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";
import { LucidePlus } from "lucide-react-native";
import SearchAndFilter from "src/components/SearchAndFilter";
import OperationsItem from "src/components/items/OperationsItem";
import AddOperationSheet from "src/components/sheets/AddOperationSheet";
import { operationsSelectors } from "@redux";
import { shallowEqual, useSelector } from "react-redux";

const OperationsScreen = ({ navigation }) => {
  return (
    <>
      <HeaderSaturated navigation={navigation} />
      <InfiniteCalendar
        renderHeader={() => <SearchAndFilter />}>
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


const LastOperations = () => {
  const {operations, operationsArray} = useSelector(state => operationsSelectors.selectOperationsAndIDs(state), shallowEqual)
  const styles = StyleSheet.create({
    parent: {
      width: "100%",
      flex: 1,
    },
    content: {
      paddingBottom: 20
    }
  });

  return (
    <View style={styles.parent}>
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.block}>
        


        <DaySection>
          {operationsArray.map(itemID => 
              <OperationsItem key={itemID} item={operations[itemID]} />
          )}
        </DaySection>
        
      </ScrollView>
    </View>
  );
};

const DaySection = ({ children, timestamp }) => {
  const [themeColors] = useCurrentTheme();
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
        <Text style={styles.t}>7 October 2024</Text>
        <Text style={styles.th}>(Monday)</Text>
      </View>

      <View>{children}</View>
    </View>
  );
};

export default OperationsScreen;
