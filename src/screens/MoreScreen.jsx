import React from 'react'
import { BaseView, IconGlob, STHeader } from '@components'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import { useCurrentTheme } from 'hooks';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const width = Dimensions.get("window").width
const marginHorizontal = (width * 0.065)
const blockWidth = Math.min(width / 2 - marginHorizontal, 300)
const gap = (width * 0.04);
const MoreScreen = ({ navigation }) => {
  const [themeColors] = useCurrentTheme();
  const styles = StyleSheet.create({
    grid: {
      flexDirection: "row",
      rowGap: gap,
      flexWrap: "wrap",
      alignSelf: "center",
      justifyContent: "space-between",
      maxWidth: blockWidth * 2 + gap,
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
    },
    icon: {
      height: blockWidth / 3.5,
      width: blockWidth / 3.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
    },
    title: {
      color: themeColors.textColorHighlight,
      marginTop: 14,
      fontSize: 15
    },
  });


  const RenderItem = (props) => {
    const { title, icon, iconColor, color, route } = props;
    const scale = useSharedValue(1)
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const onNavigate = () => {
      route && navigation.navigate(route)
    }

    return (
      <Pressable
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
            title: "Explore Premium",
            color: "#3278db",
            icon: "Star"
          }} />
          <RenderItem route="addcategory" {...{
            title: "Regular Payments",
            color: "#27c281",
            icon: "RefreshCcwDot"
          }} />
          <RenderItem route="addcategory" {...{
            title: "Statistics",
            color: "#8c32db",
            icon: "ChartColumn"
          }} />
          <RenderItem route="settings__fromright" {...{
            title: "Settings",
            color: "#6732db",
            icon: "Settings"
          }} />
          <RenderItem route="settings/theme" {...{
            title: "Dark Mode",
            color: "#484a49",
            icon: "MoonStar"
          }} />
          <RenderItem route="addcategory" {...{
            title: "About SpendFlow",
            color: "#32a5db",
            icon: "ShieldCheck"
          }} />
          <RenderItem route="settings/language" {...{
            title: "Change Language",
            color: "#278cc2",
            icon: "Globe"
          }} />
          <RenderItem route="addcategory" {...{
            title: "Help",
            color: "#dbb132",
            icon: "MessageCircleQuestion"
          }} />
        </View>
      </ScrollView>
    </BaseView>
  )
}

export default MoreScreen