import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { useCurrentTheme } from 'hooks';
import { Incubator } from 'react-native-ui-lib';

const { width, height } = Dimensions.get("window")

const BottomSheetExperimental = ({ isOpen, children, toggleSheet, setHeight = height - 100  }) => {
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({
    container: {
      width: Math.min(width, height) - 30,
      height: setHeight + 50,
      maxHeight: height,
      backgroundColor: themeColors.bgHighlight,
      marginBottom: -50,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 50,

      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 21,
      borderTopRightRadius: 21,
      overflow: "hidden"
    },
    viewContent: {
      alignSelf: "center", width: 70, height: 3, backgroundColor: themeColors.chevron, marginBottom: 10
    },

    content: {
      borderTopLeftRadius: 20, overflow: "hidden", marginBottom: 0
    },
    dialog: {
      marginBottom: '0px',
    }
  });

  return (
    <Incubator.Dialog
      useSafeArea
      visible={isOpen}
      onDismiss={toggleSheet}
      bottom
      width={width}
      content={styles.content}
      containerStyle={styles.container}
      theme={{ dialog: styles.dialog }}

      modalProps={{ supportedOrientations: ['portrait', 'landscape'], overlayBackgroundColor: "rgba(0, 0, 0, 0.7)" }}
      blurView
    >
      <View>
        <View style={styles.viewContent} />
        {children}
      </View>
    </Incubator.Dialog>
  )
};





export default BottomSheetExperimental;
