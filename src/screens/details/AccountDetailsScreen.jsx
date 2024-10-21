import { Text, StyleSheet } from 'react-native'
import React from 'react'
import { useCurrentTheme } from 'hooks';
import { BaseView, STHeader } from '@components';
import { useNavigation } from '@react-navigation/native';

const AccountDetailsScreen = () => {
  const navigation = useNavigation()
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
    <Text style={styles.text}>TransactionDetailsScreen</Text>
  </BaseView>
  )
}

export default AccountDetailsScreen