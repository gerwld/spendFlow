import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import React from 'react'
import { STHeader } from '@components'
import { useTranslation } from 'react-i18next';
import { useCurrentTheme } from 'hooks';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AboutMoreScreen = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const [themeColors] = useCurrentTheme();
  
  const styles = StyleSheet.create({
    content: {
      height: "100%",
      marginVertical: 15,
      marginHorizontal: 18
    },
  header: {
    flexDirection:"row",
    alignItems: 'center',    
  },
  header_icon: {
    backgroundColor: themeColors.borderColorSec,
    height: 80,
    width: 80,
    borderRadius: 25
  },
  header_content: {
    paddingLeft: 10
  },
  header_title: {
    color: themeColors.textColorHighlight,
    fontSize: 19
  },
  header_version: {
    fontSize: 14,
    marginTop: 5,
    color: themeColors.textColor
  },
  whats_new: {
    fontSize: 14,
    marginTop: 5,
    color: themeColors.tabsActiveColor
  },
  rate_btn: {
    alignSelf: "center",
    position: "absolute",
    bottom: insets.bottom +  200,
    zIndex: 1000,
    borderRadius: 10,
    width: "80%",
    backgroundColor: themeColors.tabsActiveColor,
    paddingHorizontal: 20,
    paddingVertical: 14,

  },
  rate_btn__text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600"
  },
  about: {
    marginTop: 10,
    marginHorizontal: 5,
    paddingTop: 10,
    borderTopColor: themeColors.borderColorSec,
    borderTopWidth: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: themeColors.textColorHighlight
  }
,
desc: {
  fontSize: 14,
  fontWeight: "400",
  color: themeColors.textColor,
  marginTop: 20,
  lineHeight: 20
}
  });
  
  return (
    <View>
      <STHeader {...{ navigation, title: t("ms__aboutus") }} />
      <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.header_icon}></View>
        <View style={styles.header_content}>
          <Text style={styles.header_title}>SpendFlow</Text>
          <Text style={styles.header_version}>Version 1.0.0</Text>
          <Text style={styles.whats_new}>What's new in SpendFlow</Text>
        </View>
      </View>

      <ScrollView style={styles.about}>
        <Text style={styles.title}>Title Lorem, ipsum dolor.</Text>
        <Text style={styles.desc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure ad nemo atque consectetur provident explicabo eaque natus molestias accusamus nihil.</Text>
      </ScrollView>

      </View>
      <Pressable style={styles.rate_btn}>
        <Text style={styles.rate_btn__text}>
          {Platform.OS === "android" && "Rate us in Play Market"}
          {Platform.OS === "ios" && "Rate us in App Store"}
          {Platform.OS === "web" && "Rate us"}
          </Text>
      </Pressable>
    </View>
  )
}

export default AboutMoreScreen