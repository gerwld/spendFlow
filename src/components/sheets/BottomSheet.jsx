import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
} from "react-native";

const { height: screenHeight } = Dimensions.get("screen");

const BottomSheet = ({ isOpen, children, toggleSheet, duration = 200, backgroundColor }) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current; // Create an animated value for opacity
  const [isOpenForModal, setIsOpenForModal] = useState(false);  

  useEffect(() => {
    if (isOpen) {
      setIsOpenForModal(true);

      // Animate the background and the bottom sheet
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0, // Slide into view
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Fade in the background
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate the background and the bottom sheet in reverse
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight, // Slide out of view
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Fade out the background
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setIsOpenForModal(false), 0); // Delay modal closing to allow animation
      });
    }
  }, [isOpen]);

  return (
    <Modal 
      animationType="none"
      onRequestClose={toggleSheet}
      transparent
      visible={isOpenForModal}
    >
      <TouchableWithoutFeedback onPress={toggleSheet}>
        <Animated.View style={[styles.overlay, { opacity }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: backgroundColor || "#ffffff",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay behind the bottom sheet
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: screenHeight - 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});

export default BottomSheet;
