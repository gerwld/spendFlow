import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks'

const Segment = ({children}) => {
  const [themeColors] = useCurrentTheme()
    const styles = StyleSheet.create({
        block: {
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 12,
            borderColor: themeColors.borderColor,
            borderWidth: 1.1,
            overflow: "hidden",
        }
    })
  return (
    <View style={styles.block}>
      {children}
    </View>
  )
}

export default Segment