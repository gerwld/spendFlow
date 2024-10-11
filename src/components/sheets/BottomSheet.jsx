import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from "react-native";

const { height: screenHeight } = Dimensions.get("screen");

const AnimatedBottomSheet = ({ isOpen, children, toggleSheet, duration = 200 }) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const [isOpenForModal, setIsOpenForModal] = useState(false);  

  useEffect(() => {
    if (isOpen) {
      // Open the modal first, then start the animation
      setIsOpenForModal(true);
      Animated.timing(translateY, {
        toValue: 0, // Slide into view
        duration: duration,
        useNativeDriver: true,
      }).start();
    } else {
      // Start the closing animation, then close the modal after the animation finishes
      Animated.timing(translateY, {
        toValue: screenHeight, // Slide out of view
        duration: duration,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setIsOpenForModal(false), 0); // Delay modal closing to allow animation
      });
    }
  }, [isOpen]);

  return (
    <Modal 
      animationType="none"
      onRequestClose={toggleSheet}
      onPress={toggleSheet} transparent visible={isOpenForModal}>
      <TouchableWithoutFeedback onPress={toggleSheet}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay behind the bottom sheet
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300, // Adjust the height of your bottom sheet
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});

export default AnimatedBottomSheet;
