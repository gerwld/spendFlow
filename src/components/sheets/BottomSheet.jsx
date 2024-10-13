import { useCurrentTheme } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("screen");

const BottomSheet = ({
  isOpen,
  children,
  toggleSheet,
  duration = 200,
  backgroundColor,
  maxHeightMultiplier = 0.86,
  setHeight = 400,
  setFullWidth,
  title,
  rightButton,
  leftButton }) => {
  const [themeColors] = useCurrentTheme();
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

      minHeight: setHeight ? (setHeight + 50) : (screenHeight * maxHeightMultiplier + 50),
      height: setHeight + 50,
      maxHeight: screenHeight - 80,
      alignItems: "center",

      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: setFullWidth ? 0 : 20,
    },

    cancelBTN: {
      alignSelf: "flex-start",
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 10,
      paddingLeft: 2,
      height: 45
    },
    cancelBTNText: {
      fontSize: 17.5,
      color: "#4080f6",
    },
    header: {
      width: "100%",
      marginTop: 10,
      marginBottom: 6,
      flexDirection: "row",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 19,
      fontWeight: "600",
      flexBasis: "50%",
      lineHeight: 45,
      textAlign: "center",
      color: themeColors.textColorHighlight
    },
    leftButton: {
      flexBasis: "25%",
      paddingLeft: setFullWidth ? 20 : 0,
    },
    rightButton: {
      flexBasis: "25%",
      marginLeft: "auto",
      paddingRight: setFullWidth ? 20 : 0,
    },
    rightBtn: {
      marginLeft: "auto",
      marginRight: 0
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
      statusBarTranslucent={true} 
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

        <View style={styles.header}>

          <View style={styles.leftButton}>
            {leftButton
              ? <Pressable style={styles.cancelBTN} onPress={leftButton.onPress}>
                <Text style={styles.cancelBTNText}>{leftButton.title}</Text>
              </Pressable>

              : <Pressable style={styles.cancelBTN} onPress={closeModal}>
                <Text style={styles.cancelBTNText}>Cancel</Text>
              </Pressable>

            }
          </View>

          {title && <Text style={styles.headerTitle}>{title}</Text>}

          <View style={styles.rightButton}>
            {rightButton &&
              <Pressable style={[styles.cancelBTN, styles.rightBtn]} onPress={rightButton.onPress}>
                <Text style={styles.cancelBTNText}>{rightButton.title}</Text>
              </Pressable>
            }
          </View>
        </View>

        {children}
      </Animated.View>
    </Modal>
  );
};

export default BottomSheet;
