import React from 'react'
import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native'
import { useCurrentTheme, useHeaderStyles } from 'hooks';
import { useTranslation } from 'react-i18next';
import { SvgBack } from '@icons';
import { AlignJustify, LucideCheck } from 'lucide-react-native';


const STHeader = React.memo(({
    theme,
    navigation,
    title,
    onGoBack,
    leftComponent,
    rightComponent,
    leftText,
    rightText,
    rightPress,
    rightPressDisabled,
    dimmed,
    bgColor,
    renderMenu,
    ...rest
}) => {
    const { t } = useTranslation();
    const {headerStyles, HEADER_HEIGHT_SAFE} = useHeaderStyles(theme, isWhite = true);
    const [themeColors] = useCurrentTheme();

    // header styles based on it's background color. if duotone then 
    // from headerStyles hook preset, otherways - white text and color bg
    const s = {
        textColor: { color: bgColor ? "#ffffff" : themeColors.textColorHighlight },
        activeTextColor: { color: bgColor ? "#ffffff" : themeColors.tabsActiveColor },
        backgroundColor: dimmed ? themeColors.bgSettings : bgColor ? bgColor : themeColors.bac
    }

    const styles = StyleSheet.create({
        headerButton: {
            flexShrink: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: HEADER_HEIGHT_SAFE,
            minHeight: 55,
            width: 55,
          },
    })

    const renderMenuBtn = (
        <Pressable
        style={styles.headerButton}
        onPress={() => navigation.navigate("settings")}
      >
        <AlignJustify
          style={{ marginLeft: 1, marginTop: 1, alignSelf: "center" }}
          width={31}
          height={55}
          strokeWidth={2.1}
          stroke={themeColors.textColorHighlight}
        />
      </Pressable>
      )

    return (<>
        <View style={[headerStyles.header, { backgroundColor: s.backgroundColor }]}>
            <SafeAreaView style={headerStyles.headerContent}>

                {renderMenu 
                    ? <View style={[headerStyles.leftComponent]}>{renderMenuBtn}</View> 
                    : leftComponent ? leftComponent :
                <View style={[headerStyles.leftComponent]}>
                    <Pressable
                        style={headerStyles.componentPressable}
                        onPress={() => {
                            if (onGoBack) onGoBack()
                            else navigation.goBack()
                        }}>
                            {leftText 
                            ? <Text 
                                numberOfLines={1} ellipsizeMode='tail'
                                style={[headerStyles.headerButton, s.textColor]}>{leftText}</Text>
                            : <SvgBack style={{color: themeColors.textColorHighlight, pointerEvents: "none", marginLeft: -3}} size={28}/>}
                    </Pressable>
                </View>}


                <View style={headerStyles.centerComponent}>
                    <Text 
                    numberOfLines={2} 
                    ellipsizeMode="tail"
                    style={[
                        headerStyles.headerTitle, 
                        s.textColor, 
                        title?.length > 18 && {fontSize: 18}
                        ]}>{title}</Text>
                </View>

                {rightComponent ? rightComponent :
                    rightPress
                        ? <View style={[headerStyles.rightComponent]}>
                            <Pressable
                                onPress={rightPressDisabled ? null : rightPress}
                                style={[headerStyles.componentPressable, headerStyles.componentPressableRight, { opacity: rightPressDisabled ? 0.6 : 1 }]}>
                                
                                {rightText
                                ? <Text 
                                    numberOfLines={1} ellipsizeMode="tail"
                                    style={[headerStyles.headerButton, s.activeTextColor, headerStyles.textAlignRight]}>{rightText}</Text>

                                : <LucideCheck style={{color: themeColors.textColorHighlight, pointerEvents: "none", marginLeft: -3}} size={30} strokeWidth={2.5} />}
                            </Pressable>
                        </View>
                        : <View style={headerStyles.rightComponent} />}

            </SafeAreaView>
        </View>
    </>
    )
});

export default STHeader