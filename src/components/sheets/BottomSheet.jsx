import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Pressable,
  Text,
} from "react-native";

const { height: screenHeight } = Dimensions.get("screen");

const BottomSheet = ({ isOpen, children, toggleSheet, duration = 200, backgroundColor }) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [isOpenForModal, setIsOpenForModal] = useState(false);  

  const closeModal = () => {
    isOpen && toggleSheet()
  }

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    sheet: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      maxHeight: screenHeight - 150,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
    },
    cancelBTN: {
      alignSelf: "flex-start",
      marginTop: -6,
      marginBottom: 14,
      paddingVertical: 10,
      paddingRight: 10,

    },
    cancelBTNText: {
      fontSize: 16,
      color: "#4080f6",
    }
  });
  

  useEffect(() => {
    if (isOpen) {
      setIsOpenForModal(true);


      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: screenHeight, 
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setIsOpenForModal(false), 0);
      });
    }
  }, [isOpen]);

  return (
    <Modal 
      animationType="none"
      onRequestClose={closeModal}
      transparent
      visible={isOpenForModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
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

        <Pressable style={styles.cancelBTN} onPress={closeModal}>
          <Text style={styles.cancelBTNText}>Cancel</Text>
        </Pressable>

        {children}
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
