import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Pressable, Platform } from 'react-native';
import { useCurrentTheme } from 'hooks';
import { LucideChevronLeft } from 'lucide-react-native';
import { LucideChevronRight } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const getCurrentDate = () => new Date();
const currentYear = getCurrentDate().getFullYear();
const currentMonth = getCurrentDate().getMonth();
const getFirstDayOfTheMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 0).setHours(0,0,0,0);
const firstDayOfTheMonth = getFirstDayOfTheMonth(getCurrentDate());

const InfiniteCalendar = ({ children }) => {
  const flatListRef = useRef(null);
  const [themeColors] = useCurrentTheme();

  const [isInit, setIsInit] = useState(true);
  const [months, setMonths] = useState(() => generateMonths(new Date(firstDayOfTheMonth))); // Generate 100 months
  const [currentIndex, setCurrentIndex] = useState(50); // Center item is the current month
  const [currentDate, setDate] = useState(months[currentIndex]); // initial current date

  // Generate an array of 100 months around the base month
  function generateMonths(baseMonth) {
    const generatedMonths = [];
    for (let i = -50; i <= 50; i++) {
      const newMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + i, 1); // Always set day to 1
      generatedMonths.push(newMonth);
    }
    return generatedMonths;
  }

  const handleNextPress = () => {
    if (currentIndex < 99) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: false });
    }
  };

  const handlePrevPress = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: false });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
      setDate(months[newIndex]); // updates current date when viewable item changes
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // threshold %
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  // --------- APPEND CHILD PART ---------//

  const ChildrenItem = ({ item, index }) => {
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          calendarDate: item.toString(),
          calendarIndex: index,
        });
      }
      return child;
    });

    if(Platform.OS === "android") return (
      <View style={styles.slide}>
        {(isInit && children && index === currentIndex)
          ? childrenWithProps
          : null}
      </View>)

    return (
      <View style={styles.slide}>
        {(isInit && children && index === currentIndex) ||
        index === currentIndex - 1 ||
        index === currentIndex + 1
          ? childrenWithProps
          : null}
      </View>
    );
  };

  const renderItem = ({ item, index }) => <ChildrenItem {...{ item, index }} />;

  // ------- APPEND CHILD PART END ---------//

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      backgroundColor: themeColors.background,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 0,
      // borderBottomWidth: 1,
      // borderTopWidth: 1,
      borderTopColor: themeColors.borderColorTh,
      borderBottomColor: themeColors.borderColorTh,
    },
    headerText: {
      fontSize: 17,
      fontWeight: '600',
      color: themeColors.textColorHighlight
    },
    headerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      height: 50,
    },
    slide: {
      width: width,
      height: height - 240,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    buttonText: {
      height: 30,
      lineHeight: 30
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={handlePrevPress}>
          <LucideChevronLeft width={28} height={30} stroke={themeColors.textColorHighlight}/>
        </Pressable>
        <Text style={styles.headerText}>{formatDate(currentDate)}</Text>
        <Pressable style={styles.headerButton} onPress={handleNextPress}>
          <LucideChevronRight width={28} height={30} stroke={themeColors.textColorHighlight}/>
        </Pressable>
      </View>
      <FlatList
        ref={flatListRef}
        data={months}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        initialScrollIndex={50} // start at the center (current month)
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};


export default InfiniteCalendar;
