import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ActionSheet } from 'react-native-ui-lib'
import { useCurrentTheme } from 'hooks';
import { LucideCheck } from 'lucide-react-native';
import BottomSheetExperimental from './BottomSheetExperimental';

const ConfirmDeleteSheet = ({ value, title, isOpen, toggleSheet, callbackAction, options, onSelect }) => {
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({
    buttons: {
      flexDirection: "row",
      gap: 18,
      maxWidth: 370,
      borderTopWidth: 1.4,
      borderTopColor: themeColors.borderColorTh,
      paddingVertical: 20,
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
      marginBottom: 25,
      maxWidth: 370,
      lineHeight: 30,
      fontSize: 18,
    }
  });


  return (
    <BottomSheetExperimental
      {...{ toggleSheet, isOpen, maxHeightMultiplier: 0.35, hideHeader: true, setHeight: 370 }}
    >
      <Text style={styles.title}>Delete Category</Text>
      <Text style={styles.desc}>
        Are you sure you want to delete the category{title ? ` "${title}"` : ""}? 
        This action cannot be undone. The category will remain visible in past transactions.
      </Text>
      <View style={styles.buttons}>
        <Pressable onPress={toggleSheet} style={styles.btn_pressable}>
          <Text style={styles.btn}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.btn_pressable, styles.btn_confirm]}>
          <Text style={[styles.btn, styles.btn_confirm]}>Delete</Text>
        </Pressable>
      </View>

    </BottomSheetExperimental>
  )
}

export default ConfirmDeleteSheet