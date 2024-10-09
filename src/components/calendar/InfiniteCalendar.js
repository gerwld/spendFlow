import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, Button } from 'react-native';
import dayjs from 'dayjs';

const { width, height } = Dimensions.get('window');

const InfiniteCalendar = () => {
  const flatListRef = useRef(null);
  const [months, setMonths] = useState(() => generateMonths(dayjs(), 0)); // Start with previous, current, next
  const [currentIndex, setCurrentIndex] = useState(1); // Center item is the current month

  // Generate an array of months around the base month with an offset
  function generateMonths(baseMonth, offset) {
    return [
      baseMonth.add(offset - 1, 'month'), // Previous month
      baseMonth.add(offset, 'month'),     // Current month
      baseMonth.add(offset + 1, 'month')  // Next month
    ];
  }

  const updateMonths = (direction) => {
    setMonths((prev) => {
      const baseMonth = prev[1]; // Use the current middle month as the base
      const offset = direction === 'next' ? 1 : -1;
      return generateMonths(baseMonth, offset);
    });
  };

  const handleEndReached = () => {
    // If user scrolls to the next month
    updateMonths('next');
    flatListRef.current.scrollToIndex({ index: 1, animated: false }); // Reset to center
  };

  const handleStartReached = () => {
    // If user scrolls to the previous month
    updateMonths('prev');
    flatListRef.current.scrollToIndex({ index: 1, animated: false }); // Reset to center
  };

  const handleNextPress = () => {
    updateMonths('next');
    flatListRef.current.scrollToIndex({ index: 1, animated: false });
  };

  const handlePrevPress = () => {
    updateMonths('prev');
    flatListRef.current.scrollToIndex({ index: 1, animated: false });
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.text}>{item.format('MMMM YYYY')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Previous" onPress={handlePrevPress} />
        <Text style={styles.buttonText}>{months[1].format('MMMM YYYY')}</Text>
        <Button title="Next" onPress={handleNextPress} />
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
        decelerationRate="fast"
        initialScrollIndex={1} // Start at the center (current month)
        onEndReached={handleEndReached} // Triggered when user scrolls to the end
        onEndReachedThreshold={0.1} // Trigger near the end
        onStartReached={handleStartReached} // Triggered when user scrolls to the beginning
        onStartReachedThreshold={0.1} // Trigger near the start
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttons: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 20,
    // position: "absolute",
    top: 0,
    zIndex: -1,
  },
  slide: {
    width: width,
    height: height - 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 50,
    borderTopColor: "red",
    borderTopWidth: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default InfiniteCalendar;
