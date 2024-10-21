import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { BaseView, HomeHeader, STHeader } from '@components'
import { useCurrentTheme } from 'hooks';

const TransactionDetailsScreen = ({ navigation }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    text: {
      color: themeColors.textColorHighlight
    },
  });


  return (
    <BaseView>
      <STHeader
        onRightPress={() => navigation.navigate("edit_categories_screen")}
        navigation={navigation} />
      <Text style={styles.text}>Category Details</Text>
    </BaseView>
  )
}

export default TransactionDetailsScreen