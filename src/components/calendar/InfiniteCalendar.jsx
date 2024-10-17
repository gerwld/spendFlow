import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Pressable, Platform } from 'react-native';
import { useCurrentTheme } from 'hooks';
import { LucideChevronLeft } from 'lucide-react-native';
import { LucideChevronRight } from 'lucide-react-native';
import { SVGCalendar, SVGChevronBottom } from '@icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const getCurrentDate = () => new Date();
// const currentYear = getCurrentDate().getFullYear();
// const currentMonth = getCurrentDate().getMonth();
const getFirstDayOfTheMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).setHours(0,0,0,0);
const firstDayOfTheMonth = getFirstDayOfTheMonth(getCurrentDate());

const InfiniteCalendar = ({ children, renderHeader, renderTopHeader, isGradient, shortGradient }) => {
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
          isCurrentPage: index === currentIndex
        });
      }
      return child;
    });

    return (
      <View style={styles.slide}>
        {(isInit && children && index === currentIndex) ||
        index === currentIndex - 1 ||
        index === currentIndex + 1
          ? childrenWithProps
          : null}
          {/* <Text>bottom_test</Text> */}
      </View>
    );
  };

  const renderItem = ({ item, index }) => <ChildrenItem {...{ item, index }} />;

  // ------- APPEND CHILD PART END ---------//

  const styles = StyleSheet.create({
    gradient: {
      paddingBottom: 3,
      borderBottomLeftRadius: shortGradient ? 10 : 22,
      borderBottomRightRadius: shortGradient ? 10 : 22,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      maxHeight: "100%",
    },
    dateNavigation: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 0,
      borderTopColor: themeColors.borderColorTh,
      borderBottomColor: themeColors.borderColorTh,
    },
    headerText: {
      fontSize: 16.5,
      fontWeight: '500',
      color: themeColors.textColorHighlight,
      userSelect: "none"
    },
    headerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      height: 50,
    },
    slide: {
      // borderWidth: 6,
      width: width,
      // height: height - (240 - renderHeader ? 0 : 76) ,
      maxHeight: "100%",
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
    },
    selectDateBTN: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
      paddingVertical: 5,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: themeColors.headerSelectDateBorderColor,
      backgroundColor: themeColors.headerSelectDateBackgroundColor,
    },
    selectDateBTNCalendarSVG: {
      color: themeColors.headerSelectDateSVGColor || "gray",
      marginLeft: 5,
      marginRight: 4,
      height: 13.8,
      width: 20
    },
    selectDateBTNChevronSVG: {
      color: themeColors.headerSelectDateSVGColor || "gray",
      marginLeft: 6,
      marginTop: 1,
      marginRight: 4,
      height: 10,
      width: 11
    },
    selectDateBTNHeader: {
      fontSize: 15.5,
      fontWeight: "600"
    }
  });

  const onSelectDate = () => {
    alert("Date Select Click")
  }

  const renderGradient = (children, isGradient) => {
    let gradient = [ themeColors.headerGradientStart,  themeColors.headerGradientEnd];
    if(shortGradient)
      gradient.unshift(themeColors.headerGradientStart);
    
    return isGradient 
      ? <LinearGradient
          style={styles.gradient}
          colors={gradient}>
          {children}
        </LinearGradient>
      : children
  }

  return (
    <View style={styles.container}>
     {renderGradient(
     <>
      {renderTopHeader && renderTopHeader()}

      <View style={styles.dateNavigation}>
        <Pressable 
          onPress={handlePrevPress} 
          style={styles.headerButton}>
          <LucideChevronLeft width={28} height={30} stroke={themeColors.textColorHighlight}/>
        </Pressable>
        <Pressable 
          onPress={onSelectDate} 
          style={styles.selectDateBTN}>
          <SVGCalendar style={styles.selectDateBTNCalendarSVG}/>
          <Text style={[styles.headerText, styles.selectDateBTNHeader]}>{formatDate(currentDate)}</Text>
          <SVGChevronBottom style={styles.selectDateBTNChevronSVG}/>
        </Pressable>
        <Pressable 
          onPress={handleNextPress} 
          style={styles.headerButton}>
          <LucideChevronRight width={28} height={30} stroke={themeColors.textColorHighlight}/>
        </Pressable>
      </View>

      {renderHeader && renderHeader()}
      </>, isGradient)}

      <FlatList
        ref={flatListRef}
        data={months}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.toString()}
        pagingEnabled
        style={{maxHeight:"100%"}}
        contentContainerStyle={{maxHeight:"100%"}}
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
