import React, {useState, useRef} from "react";
import { BaseView, HomeHeader } from "@components";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCurrentTheme } from "hooks";
import { getGreenRedOrGray } from "@constants";
import { ScrollView } from "react-native-gesture-handler";
import CategoryItem from "src/components/items/CategoryItem";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";
import { LucidePlus } from "lucide-react-native";
import SearchAndFilter from "src/components/SearchAndFilter";
import OperationsItem from "src/components/items/OperationsItem";

const OperationsScreen = ({ navigation }) => {
  
  
  const RightPress = (styles, stroke) => {
    return (
        <Pressable style={styles}>
          <LucidePlus style={{ alignSelf: "center" }} stroke={stroke} height={34} width={34} />
        </Pressable>
    )
  }
  return (
    <BaseView>
      <HomeHeader navigation={navigation} rightChild={RightPress} />
        <InfiniteCalendar 
          renderHeader={() => <SearchAndFilter/>}>
        <LastOperations />
      </InfiniteCalendar>
    </BaseView>
  );
};

const LastOperations = () => {

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
       style={styles.block}>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
        <DaySectionItem />
      </DaySection>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
      </DaySection>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
        <DaySectionItem />
      </DaySection>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
        <DaySectionItem />
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
      // borderBottomWidth: 1,
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

const DaySectionItem = () => {
  return <OperationsItem value={-90} />;
};

export default OperationsScreen;
