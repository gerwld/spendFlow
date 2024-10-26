import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from 'react-native'
import React, { useRef } from 'react'
import { SvgLogoInline, SVGPremium } from '@icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCurrentTheme } from 'hooks'
import { LucideChevronLeft } from 'lucide-react-native'

const windowDimensions = Dimensions.get("window")
const PremiumMoreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [themeColors] = useCurrentTheme();

  const styles = StyleSheet.create({

    header: {
      marginTop: insets.top,
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 48,
    },
    header_text: {
      color: "#ff9500",
      marginLeft: 5,
      marginBottom: 3,
      fontSize: 24,
      fontWeight: "300"
    },
    header_center: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
    },
    header_btn: {
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',

    },
    content: {
      height: "100%",
      maxHeight: windowDimensions.height,
      overflow:"scroll",
    },
    contentCS: {
      paddingBottom: 170
    },
    content_hero: {
      flexShrink: 0,
      flexGrow: 0,
    },
    content_hero__bg: {
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 15,
      backgroundColor: "#ff8800",
      justifyContent: "center",
      minHeight: Math.min(windowDimensions.height / 3, 350),
    },
    content_hero__ios: {
      marginTop: windowDimensions.height * -1,
      paddingTop: 20 + windowDimensions.height,
    },
    content_herotext: {
      color: "#000",
      maxWidth: "50%",
      fontSize: 18,
      fontWeight: "600",
      lineHeight: 27
    },
    hero_btn: {
      color: "#000",
      backgroundColor: themeColors.tabsActiveColor,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: themeColors.background + "9b",
      fontWeight: "500",
      marginLeft: -1,
      marginTop: 10
    },
    content_prem: {
      paddingTop: 5
    },
    content_prem_title: {
      fontSize: 21,
      lineHeight: 28,
      maxWidth: 340,
      paddingBottom: 6,
      alignSelf: "center",
      fontWeight: "600",
      color: themeColors.textColorHighlight,
      textAlign: "center"
    },
    premBtn: {
      borderWidth: 2,
      borderColor: themeColors.borderColorSec,
      borderRadius: 10,
      flexDirection: "row",
      alignContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 10,
      width: "92%",
      maxWidth: 320,
      minHeight: 68
    },
    premBtn__selected: {
      borderColor: themeColors.tabsActiveColor
    },
    premBtn_title: {
      color: themeColors.textColorHighlight,
      fontWeight: "600",
      fontSize: 15,
      lineHeight: 15,
      marginBottom: 4
    },
    premBtn_price: {
      color: themeColors.textColor,
      fontSize: 15,
      lineHeight: 15,
      marginBottom: 2
    },
    premBtn_save: {
      color: "#ff7700",
      fontSize: 12,
      lineHeight: 12,
 
    },
    premBtn_recommended: {
      backgroundColor: themeColors.borderColorFt,
      fontSize: 12,
      fontWeight: "600",
      alignSelf: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 14,
      overflow: "hidden",
      marginLeft: "auto",
      flexShrink: 0,
      flexGrow: 0
    },
    premBtn_checkmark: {
      marginLeft: 5,
      marginRight: 15,
      width: 20,
      height: 19.9,
      alignSelf: "center",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 2.5,
      borderColor: themeColors.borderColorSec
    },
    premBtn_checkmark__selected: {
      borderColor: themeColors.tabsActiveColor + "8b"

    },
    premBtn_chcontent: {
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: themeColors.tabsActiveColor 
    },
    prem_buttons: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      marginTop: 12
    },
    sub: {
      color: themeColors.chevronText,
      fontSize: 11,
      lineHeight: 16,
      maxWidth: 300,
      textAlign: "center",
      alignSelf: "center",
      marginVertical: 10
    },
    sup: {
      color: themeColors.chevronText,
      fontSize: 11,
      lineHeight: 14,
      maxWidth: 346,
      fontWeight: "600",
      textAlign: "center",
      alignSelf: "center",
    },
    sub2: {
      color: themeColors.chevronText,
      fontSize: 11,
      lineHeight: 16,
      maxWidth: 300,
      textAlign: "center",
      alignSelf: "center",
      marginVertical: 10
    },
    btn_submit: {
      backgroundColor: "#ff8800",
      color: themeColors.background,
      marginHorizontal: 30,
      width: 300,
      alignSelf: "center",
      textAlign: "center",
      height: 40,
      lineHeight: 40,
      fontSize: 15,
      fontWeight: "600",
      borderRadius: 10,
      overflow: "hidden"
    },
    btn_restore: {
      color: themeColors.tabsActiveColor,
      textAlign: "center",
      padding: 10,
      marginVertical: 10,
      fontWeight: "600",
      fontSize: 14,
      lineHeight: 40
    },
    premBtn__selected__active: {
      backgroundColor: themeColors.tabsActiveColor + "9b"
    },
    premBtn_content: {
      justifyContent: 'center',
    }
  });

  const scrollViewRef = useRef(null);

  const onGetPremiumPressHeader = () => {
    scrollViewRef.current?.scrollTo({
      y: 240, 
      animated: true,
    });
  }

  const onGoBack = () => navigation.goBack()
  const renderHeader = (
    <View style={styles.header}>
      <Pressable onPress={onGoBack} style={styles.header_btn}>
        <LucideChevronLeft color={themeColors.textColor} size={25} />
      </Pressable>
      <View style={styles.header_center}>
        <SvgLogoInline color={themeColors.textColorHighlight} size={30} />
        <Text style={styles.header_text}>Premium</Text>
      </View>
      <View style={styles.header_btn}></View>
    </View>
  )

  const [selectedOption, setSelectedOption] = React.useState("93c83851-0adf-47dd-a18b-0bfbb6a56306")
  
  const OPTIONS = [
    {
      id: "04cf5138-331c-43c8-aa7d-0afa7f2e3ec2",
      title: "12 Months",
      value: "208,90 PLN",
      save: "Save 66%",
      isRecommended: false
    },
    {
      id: "93c83851-0adf-47dd-a18b-0bfbb6a56306",
      title: "3 Months",
      value: "100,00 PLN",
      save: "Save 66%",
      isRecommended: true
    },
    {
      id: "f52f1d85-0efe-4736-ade6-62414a8c5bad",
      title: "1 Month",
      value: "36,90 PLN",
      isRecommended: false
    }
  ]





  const PremBtn = (props) => {
    const onSetOption = () => setSelectedOption(props.id);
    const {isRecommended, title, value, save, isSelected} = props; 
    return (
      <Pressable onPress={onSetOption} style={[styles.premBtn, isSelected && styles.premBtn__selected]}>
        <View style={[styles.premBtn_checkmark, isSelected && styles.premBtn_checkmark__selected]}>
          <View style={[isSelected && styles.premBtn_chcontent]} />
        </View>

        <View style={styles.premBtn_content}>
          <Text style={styles.premBtn_title}>{title}</Text>
          <Text style={styles.premBtn_price}>{value}</Text>
          {save ? <Text style={styles.premBtn_save}>Save 66%</Text> : null}
        </View>
        {isRecommended && <Text style={[styles.premBtn_recommended, isSelected && styles.premBtn__selected__active]}>Recommended</Text>}
      </Pressable>
    )
  }






  return (
    <View>
      {renderHeader}

      <ScrollView ref={scrollViewRef} style={styles.content} contentContainerStyle={styles.contentCS}>

        <View style={styles.content_hero}>
          <View style={[styles.content_hero__bg, Platform.OS === "ios" && styles.content_hero__ios]}>
            <Text style={styles.content_herotext}>Premium Helps You Stay Motivated for Longer and get Closer to Your Goals</Text>
            <Pressable onPress={onGetPremiumPressHeader}>
              <Text style={styles.hero_btn}>Get Premium</Text>
            </Pressable>
          </View>
          <SVGPremium />
        </View>

        <View style={styles.content_prem}>
          <Text style={styles.content_prem_title}>Upgrade to Premium and Reach Your Finance Goals Easier</Text>

          <View style={styles.prem_buttons}>
            {OPTIONS.map(item => <PremBtn key={item.id} {...item} isSelected={item.id === selectedOption}/>)}

          </View>
          <Text style={styles.sub}>We recommend our 3-month plan as it offers the right balace of affordability and commitment to help you achive your goals. Consisten tracking and progress over three month will give you the momentum you need to succeed over the long term.</Text>
          <Pressable>
            <Text style={styles.btn_submit}>Get {OPTIONS.find(e => e.id === selectedOption).title} Plan</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.btn_restore}>Restore Purchase</Text>
          </Pressable>

          <Text style={styles.sup}>Terms of Use and Privacy Policy</Text>
          <Text style={styles.sub2}>*Your Premium subscription will be charget to your iTunes account and renews automatically unless cancelled at least 24 hours prior to the end of the subscription period ath the same price and subscription type you reviously purchased. Subscriptions can be managed through your iTunes account.</Text>

        </View>

      </ScrollView>
    </View>
  )
}

export default PremiumMoreScreen