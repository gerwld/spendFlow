import React from "react";
import { BaseView, HomeHeader } from "@components";
import { StyleSheet, Text, View } from "react-native";
import { useCurrentTheme } from "hooks";
import { getGreenRedOrGray } from "@constants";
import { ScrollView } from "react-native-gesture-handler";
import CategoryBlock from "src/components/CategoryBlock";
import InfiniteCalendar from "src/components/calendar/InfiniteCalendar";

const OperationsScreen = ({ navigation }) => {
  return (
    <BaseView>
      <HomeHeader navigation={navigation} />
      <InfiniteCalendar>
      <LastOperations />
      </InfiniteCalendar>
    </BaseView>
  );
};

const LastOperations = () => {
  
  const styles = StyleSheet.create({
    block: {
      width: "100%",
      marginTop: 10
    },
  });
  
  return (
    <ScrollView style={styles.block}>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
        <DaySectionItem />
      </DaySection>
      <DaySection>
        <DaySectionItem />
        <DaySectionItem />
      </DaySection>
    </ScrollView>
  );
};

const DaySection = ({ children, timestamp }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 15,
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: themeColors.borderColorSec,
    },
    t: {
      color: themeColors.textColorHighlight,
      fontSize: 16,
    },
    tb: {
      color: themeColors.textColor,
      fontSize: 20,
    },
    th: {
      color: themeColors.textColor,
      fontSize: 14,
    },
    child: {
      marginHorizontal: 15,
      marginTop: 5,
      marginBottom: 18,
    }
  });

  return (
    <View style={styles.block}>
      <View style={styles.header}>
        <View>
          <Text style={styles.t}>7 October 2024</Text>
          <Text style={styles.th}>(Monday)</Text>
        </View>
        <Text style={[styles.tb, getGreenRedOrGray(-500, themeColors)]}>
          -500 PLN
        </Text>
      </View>

      <View style={styles.child}>{children}</View>
    </View>
  );
};

const DaySectionItem = () => {
  return <CategoryBlock isDaySection isRow value={-90} />;
};

export default OperationsScreen;
