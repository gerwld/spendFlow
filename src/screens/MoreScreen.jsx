import React from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useCurrentTheme } from 'hooks';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { t } from 'i18next';

const width = Dimensions.get("window").width
const itemsPerRow = (width > 768 ? 3 : 2)
const marginHorizontal = (width * 0.065)
const blockWidth = Math.min(width / 2 - marginHorizontal, 180)
const gap = itemsPerRow === 3 ? (width * 0.028) : (width * 0.04);
const MoreScreen = ({ navigation }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    grid: {
      flexDirection: "row",
      rowGap: gap,
      flexWrap: "wrap",
      alignSelf: "center",
      justifyContent: "space-between",
      maxWidth: blockWidth * itemsPerRow + (itemsPerRow === 3 ?  gap * 2 : gap),
      marginTop: gap
    },
    grid_item: {
      backgroundColor: themeColors.bgHighlight,
      flexBasis: blockWidth,
      width: blockWidth,
      maxWidth: width,
      height: blockWidth * 0.8,
      borderRadius: 10,
      overflow: "hidden",
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: themeColors.borderColorSec,
      backgroundColor: themeColors.bgHighlightSec,
    },
    icon: {
      height: blockWidth / 3.5,
      width: blockWidth / 3.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      opacity: 0.85
    },
    title: {
      color: themeColors.textColorHighlight,
      marginTop: 14,
      fontSize: 15
    },
    last_item: {
      marginLeft: gap,
      marginRight: "auto"
    }
  });


  const RenderItem = (props) => {
    const { title, icon, iconColor, color, route, style } = props;
    const scale = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const onNavigate = () => {
      route && navigation.navigate(route)
    }

    return (
      <Pressable
        style={style}
        onPress={onNavigate}
        onPressIn={() => scale.value = withSpring(0.9, { stiffness: 300 })}
        onPressOut={() => scale.value = withSpring(1, { stiffness: 300 })}
      >
        <Animated.View style={[styles.grid_item, animatedStyle]}>
          <View style={[styles.icon, { backgroundColor: color || "#27c265" }]}>
            <IconGlob name={icon || ""} size={blockWidth / 5.5} color={iconColor || "#ffffff"} />
          </View>
          <Text style={styles.title}>{title || "No data"}</Text>
        </Animated.View>
      </Pressable>
    )
  }

  return (
    <BaseView>
      <STHeader {...{
        navigation,
        title: "More",
        renderMenu: true
      }} />
      <ScrollView>

        <View style={styles.grid}>
          <RenderItem route="addcategory" {...{
            title: t("ms__premium"),
            color: "#3278db",
            icon: "Star"
          }} />
          <RenderItem route="addcategory" {...{
            title: t("ms__payments"),
            color: "#27c281",
            icon: "RefreshCcwDot"
          }} />
          <RenderItem route="addcategory" {...{
            title: t("ms__statistics"),
            color: "#8c32db",
            icon: "ChartColumn"
          }} />
          <RenderItem route="settings__fromright" {...{
            title: t("ms__settings"),
            color: "#6732db",
            icon: "Settings"
          }} />
          <RenderItem route="settings/theme" {...{
            title: t("ms__darkmode"),
            color: "#484a49",
            icon: "MoonStar"
          }} />
          <RenderItem route="addcategory" {...{
            title: t("ms__aboutus"),
            color: "#32a5db",
            icon: "ShieldCheck"
          }} />
          <RenderItem route="settings/language" {...{
            title: t("ms__language"),
            color: "#278cc2",
            icon: "Globe"
          }} />
          <RenderItem route="faq_screen" {...{
            style: styles.last_item,
            title: t("ms__help"),
            color: "#dbb132",
            icon: "MessageCircleQuestion"
          }} />
        </View>
      </ScrollView>
    </BaseView>
  )
}

export default MoreScreen