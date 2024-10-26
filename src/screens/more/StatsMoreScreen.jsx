import { View, Text } from 'react-native'
import React from 'react'
import { STHeader } from '@components'
import { useTranslation } from 'react-i18next';

const StatsMoreScreen = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View>
      <STHeader {...{ navigation, title: t("ms__statistics") }} />
    </View>
  )
}

export default StatsMoreScreen