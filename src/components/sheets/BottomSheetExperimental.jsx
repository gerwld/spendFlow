import React from 'react'
import { View, Dimensions, StyleSheet, Pressable, Text } from 'react-native'
import { useCurrentTheme } from 'hooks';
import { Incubator } from 'react-native-ui-lib';

const { width, height } = Dimensions.get("window")

const BottomSheetExperimental = ({ isOpen, children, toggleSheet, setHeight = height - 100  }) => {
  const [themeColors] = useCurrentTheme();

  const closeModal = () => {
    isOpen && toggleSheet()
  }

  const styles = StyleSheet.create({
    container: {
      width: Math.min(width, height) - 30,
      height: setHeight + 50,
      maxHeight: height - 80,
      backgroundColor: themeColors.bgHighlight,
      marginBottom: -50,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 50,

      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      overflow: "hidden"
    },
    topNotch: {
      alignSelf: "center", borderRadius: 5, width: 50, height: 5, backgroundColor: themeColors.chevron, marginBottom: 3
    },

    content: {
      borderTopLeftRadius: 20, overflow: "hidden", marginBottom: 0
    },
    dialog: {
      marginBottom: '0px',
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
      <View>
        <View style={styles.topNotch} />
        <Pressable style={styles.cancelBTN} onPress={closeModal}>
          <Text style={styles.cancelBTNText}>Cancel</Text>
        </Pressable>
        {children}
      </View>
    </Incubator.Dialog>
  )
};





export default BottomSheetExperimental;
