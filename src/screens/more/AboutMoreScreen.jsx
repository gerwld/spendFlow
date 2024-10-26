import { View, Text } from 'react-native'
import React from 'react'
import { STHeader } from '@components'
import { useTranslation } from 'react-i18next';

const AboutMoreScreen = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View>
      <STHeader {...{ navigation, title: t("ms__aboutus") }} />
    </View>
  )
}

export default AboutMoreScreen