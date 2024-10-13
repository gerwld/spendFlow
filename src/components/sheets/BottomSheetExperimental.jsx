import React from 'react'
import { View, Dimensions, StyleSheet, Pressable, Text, Platform } from 'react-native'
import { useCurrentTheme } from 'hooks';
import { Incubator } from 'react-native-ui-lib';

const { width, height } = Dimensions.get("window")

const BottomSheetExperimental = ({ isOpen, children, toggleSheet, rightButton, title, setHeight, maxHeightMultiplier = 0.86, setFullWidth = false  }) => {
  const [themeColors] = useCurrentTheme();

  const closeModal = () => {
    isOpen && toggleSheet()
  }

  const styles = StyleSheet.create({
    container: {
      width: setFullWidth ? width : Math.min(width, height) - 30,
      minHeight: height * maxHeightMultiplier + 50,
      maxHeight: height - 80,
      height: setHeight || "auto",
      backgroundColor: themeColors.bgHighlight,
      marginBottom: -50,
      paddingHorizontal: setFullWidth ? 0 : Platform.OS === "android" ? 15 : 20,
      paddingTop: 7,
      paddingBottom: 50,

      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: "hidden"
    },
    topNotch: {
      alignSelf: "center", borderRadius: 5, width: 40, height: 4, backgroundColor: themeColors.crossSymb,
    },

    content: {
      borderTopLeftRadius: 20, overflow: "hidden", marginBottom: 0
    },
    dialog: {
      marginBottom: '0px',
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
      marginTop: 1,
      marginBottom: 6,
      flexDirection:"row",
      alignItems:"center",
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

  if(width) return (
    <Incubator.Dialog
      useSafeArea
      visible={isOpen}
      onDismiss={closeModal}
      bottom
      
      width={width}
      content={styles.content}
      containerStyle={styles.container}
      theme={{ dialog: styles.dialog }}

      modalProps={{ supportedOrientations: ['portrait', 'landscape'], overlayBackgroundColor: "rgba(0, 0, 0, 0.7)" }}
      blurView
    >
      <View style={{alignItems: "center", flex: 1}}>
        <View style={styles.topNotch} />
        <View style={styles.header}>

        <View style={styles.leftButton}>
          <Pressable style={styles.cancelBTN} onPress={closeModal}>
            <Text style={styles.cancelBTNText}>Cancel</Text>
          </Pressable>
        </View>

        {title &&  <Text style={styles.headerTitle}>{title}</Text>}

        <View style={styles.rightButton}>
          {rightButton &&
            <Pressable style={[styles.cancelBTN, styles.rightBtn]} onPress={rightButton.onPress}>
            <Text style={styles.cancelBTNText}>{rightButton.title}</Text>
          </Pressable>
          }
        </View>
        </View>
        {children}
      </View>
    </Incubator.Dialog>
  )
};





export default BottomSheetExperimental;
