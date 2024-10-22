import { View, Text, StyleSheet, Pressable, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import { useCurrentTheme } from 'hooks';
import BottomSheetExperimental from './BottomSheetExperimental';
import { produce } from 'immer';
import { LucideCheck } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const ConfirmDeleteSheet = ({ title, desc, isOpen, toggleSheet, callbackAction, setHeight = 380 }) => {
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({
    buttons: {
      flexDirection: "row",
      gap: 16,
      maxWidth: 370,
      borderTopWidth: 1.4,
      borderTopColor: themeColors.borderColorTh,
      paddingVertical: 22,
      paddingHorizontal: 1
    },
    btn_pressable: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
      minHeight: 48,
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: themeColors.borderColorSec,
      borderColor: themeColors.borderColorFt,
    },
    btn: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      color: themeColors.textColorHighlight,
      fontSize: 16.5,
      fontWeight: "500"
    },
    btn_confirm: {
      color: "#fff",
      borderColor: themeColors.tabsActiveColor,
      backgroundColor: themeColors.tabsActiveColor
    },
    title: {
      fontSize: 26,
      lineHeight: 26,
      fontWeight: "800",
      color: themeColors.textColorHighlight,
      marginTop: 35,
      marginBottom: 16,
    },
    desc: {
      color: themeColors.textColor,
      marginBottom: 20,
      maxWidth: 370,
      lineHeight: 30,
      fontSize: 16.5,
    },
    progressScreen: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%",
      minHeight: 320,
      paddingBottom: 20
    },
    checkmark: {
      width: 70,
      height: 70,
      borderRadius: 10,
      textAlign: "center",
      alignItems: 'center',
      justifyContent: 'center',
      color: themeColors.tabsActiveColor,
      backgroundColor: themeColors.borderColor
    }
  });

  const [state, setState] = useState({
    isSpinner: false,
    isDone: false
  });

  const onConfirm = () => {
    setState(produce((draft) => {
      draft.isSpinner = true
    }));
    if (callbackAction) {
      setTimeout(() => {
        setState(produce((draft) => {
          draft.isSpinner = false
          draft.isDone = true
        }))
        setTimeout(() => {
          setState(produce((draft) => {
            draft.isSpinner = false
            draft.isDone = false
          }))
        }, 700)
        setTimeout(callbackAction, 500)
      }, 700)
    }
  }

  const renderContent = (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>
        {desc}
      </Text>
      <View style={styles.buttons}>
        <Pressable onPress={toggleSheet} style={styles.btn_pressable}>
          <Text style={styles.btn}>Cancel</Text>
        </Pressable>
        <Pressable onPress={onConfirm} style={[styles.btn_pressable, styles.btn_confirm]}>
          <Text style={[styles.btn, styles.btn_confirm]}>Delete</Text>
        </Pressable>
      </View>
    </>
  )

  const renderSpinner = (
    <Animated.View entering={FadeIn.duration(300)} style={styles.progressScreen}>
      <View style={styles.checkmark}>
        <ActivityIndicator style={Platform.OS === "ios" && { marginLeft: 4, marginTop: 4 }} size="large" color={themeColors.tabsActiveColor} />
      </View>
    </Animated.View>
  )
  const renderCheckmark = (
    <Animated.View entering={FadeIn.duration(300)} style={styles.progressScreen}>
      <View style={styles.checkmark}>
        <LucideCheck size={40} strokeWidth={3} color={themeColors.tabsActiveColor} stroke={themeColors.tabsActiveColor} />
      </View>
    </Animated.View>
  )

  return (
    <BottomSheetExperimental
      {...{ toggleSheet, isOpen, maxHeightMultiplier: 0.2, setHeight, hideHeader: true, withGap: true, setHeight }}
    >

      {!state.isSpinner && !state.isDone && renderContent}
      {state.isSpinner && renderSpinner}
      {state.isDone && renderCheckmark}
    </BottomSheetExperimental>
  )
}

export default ConfirmDeleteSheet