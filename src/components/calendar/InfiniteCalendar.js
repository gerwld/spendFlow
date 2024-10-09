import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Pressable, Platform } from 'react-native';
import dayjs from 'dayjs';
import { useCurrentTheme } from 'hooks';
import MonthGeneral from 'src/screens/home/MonthGeneral';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const InfiniteCalendar = () => {
  const [themeColors] = useCurrentTheme();
  const [isInit, setIsInit] = useState(true);
  const flatListRef = useRef(null);
  const [months, setMonths] = useState(() => generateMonths(dayjs()));   // Generate 100 months
  const [currentIndex, setCurrentIndex] = useState(50);                  // Center item is the current month
  const [currentDate, setDate] = useState(months[currentIndex]);         // initial current date

  // Generate an array of 100 months around the base month
  function generateMonths(baseMonth) {
    const generatedMonths = [];
    for (let i = -50; i <= 50; i++) {
      generatedMonths.push(baseMonth.add(i, 'month'));
    }
    return generatedMonths;
  }

  const handleNextPress = () => {
    if(currentIndex < 99)
    flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated:  false });
  };

  const handlePrevPress = () => {
    if(currentIndex > 0)
    flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: false });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      {/* <Text style={styles.text}>{item.format('MMMM YYYY')}</Text> */}
      {(isInit 
        && index === currentIndex
        || index === currentIndex - 1
        || index === currentIndex + 1) && <MonthGeneral />}

    </View>
  );

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    buttons: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      marginBottom: 0,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderTopColor: themeColors.borderColorSec,
      borderBottomColor: themeColors.borderColorSec,
    },
    headerText: {
      fontSize: 17,
      fontWeight: '600',
    },
    slide: {
      width: width,
      height: height - 50,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable onPress={handlePrevPress}>
          <Text style={styles.buttonText}>Previous</Text>
        </Pressable>
        <Text style={styles.headerText}>{currentDate.format('MMMM YYYY')}</Text>
        <Pressable onPress={handleNextPress}>
          <Text style={styles.buttonText}>Next</Text>
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
