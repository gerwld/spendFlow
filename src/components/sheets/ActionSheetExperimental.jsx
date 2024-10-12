import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { ActionSheet } from 'react-native-ui-lib'
import { useCurrentTheme } from 'hooks';
import { LucideCheck } from 'lucide-react-native';

const ActionSheetExperimental = ({ value, title, isOpen, toggleSheet,  options, onSelect}) => {
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColors.bgHighlight,
      marginBottom: 50,
    },
    dialogStyle: {
      backgroundColor: themeColors.bgHighlight,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      paddingTop: 10,
      paddingHorizontal: 24
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      marginBottom: 10,
    },
    item_content: {
      marginRight: "auto",
      flexDirection: "row",
      alignItems: "center",
    },
    itemText: {
      fontSize: 20,
      color: themeColors.textColorHighlight
    },
    itemSub: {
      marginLeft: 5,
      fontSize: 20,
      color: themeColors.textColor
    },
    cancelBTN: {
      alignSelf: "flex-start",
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 10,
      paddingLeft: 0,
      height: 45
    },
    cancelBTNText: {
      fontSize: 17.5,
      color: "#4080f6",
    },
    header: {
      marginTop: 1,
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
      flexBasis: "25%"
    },
    rightButton: {
      flexBasis: "25%"
    }
  });

  const onLabelPress = (label) => {
    onSelect(label);
    // setTimeout(closeModal, 50);
  }

  const closeModal = () => {
    isOpen && toggleSheet()
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.leftButton}>
        <Pressable style={styles.cancelBTN} onPress={closeModal}>
          <Text style={styles.cancelBTNText}>Back</Text>
        </Pressable>
      </View>
      {title && <Text style={styles.headerTitle}>{title}</Text>}
      <View style={styles.rightButton}></View>
    </View>
  )

  const renderItem = ({ label, subLabel, onPress }) => (
    <Pressable style={styles.item} onPress={() => onLabelPress(label)}>
      <View style={styles.item_content}>
        <Text style={styles.itemText}>{label}</Text>
        <Text style={styles.itemSub}>{subLabel}</Text>
      </View>
        {label === value && <LucideCheck width={25} height={25} stroke={themeColors.tabsActiveColor}/>}
      </Pressable>
  )


  return (
    <ActionSheet
      dialogStyle={styles.dialogStyle}
      containerStyle={styles.container}
      renderAction={renderItem}
      renderTitle={renderHeader}
      on
      onPress={(label) => console.log(label)}
      dialogProps={{ modalProps: { supportedOrientations: ['portrait', 'landscape'] }, overlayBackgroundColor: "rgba(0, 0, 0, 0.5)" }}
      message={'Message goes here'}
      visible={isOpen}
      onDismiss={toggleSheet}
      options={options}
    />
  )
}

export default ActionSheetExperimental