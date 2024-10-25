import React, { useCallback } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated';

import { BaseView, IconGlob, STHeader } from '@components';
import { ICONS_SETS, ICONS_SETS_MASKS } from '@constants';
import { useCurrentTheme } from 'hooks';
import { t } from 'i18next';

const SCIcon = ({ route, navigation }) => {
    const [themeColors] = useCurrentTheme();
    const [state, setState] = React.useState({
        ...route.params.state
    });
    const iconColor = themeColors.textColor;
    const activeIconColor = themeColors.tabsActiveColor;

    const styles = StyleSheet.create({
        content: {
            flex: 1,
            marginHorizontal: 15,
            paddingTop: 15
        },
        categoryTitle: {
            fontSize: 15,
            textTransform: "capitalize",
            color: themeColors.textColorHighlight,
            marginBottom: 8,
            fontWeight: "500"
        },
        categoryIcons: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 24
        },
        categoryIcon: {
            flexGrow: 1,
            position: "relative",
            width: 49,
            maxWidth: 52,
            height: 50,
            borderWidth: 1,
            borderColor: themeColors.borderColorTh,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: "hidden"
        },
        categoryIconActive: {
            borderWidth: 2,
            borderColor: activeIconColor
        },
        active_icon_bg: {
            position: "absolute",
            ...StyleSheet.absoluteFill,
            backgroundColor: activeIconColor,
            zIndex: -1,
            borderRadius: 10,
            opacity: iconColor ? (themeColors.label === "dark" ? 0.2 : 0.1) : 1,
        },
    });


    const onChangeInput = useCallback((name, value) => {
        if (name && value !== undefined) {
            setState({ ...state, [name]: value })
            if(state)
                route.params.onGoBack({data: { ...state, [name]: value }});
        }
    }, [])

    const handleGoBack = () => {
        // Pass data back to ScreenA using the onGoBack callback
        route.params.onGoBack({ data: { ...state } });
        navigation.goBack();
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
          e.preventDefault();
          if (route.params?.onGoBack) {
            route.params.onGoBack({ data: { ...state } });
          }
          navigation.dispatch(e.data.action);
        });
        return unsubscribe;
      }, [navigation, route.params, state]);

    React.useEffect(() => {
        setState({ ...state, ...route.params.state });
    }, [route.params])

    return (

        <BaseView>
            <STHeader
                onGoBack={handleGoBack}
                navigation={navigation}
                title={t("vt_icon")}
            />

            <ScrollView>

                <View style={styles.content}>
                    {ICONS_SETS_MASKS.map((category, index) => {
                        return <CategoryBlock {...{
                            styles,
                            category,
                            onChangeInput,
                            currentIcon: state.icon,
                            delay: index > 3 ? (100 * (index - 3)) : 0 // for shift
                        }} />
                    })}
                </View>
            </ScrollView>


        </BaseView>
    )
}

const CategoryBlock = ({ styles, category, currentIcon, onChangeInput, delay = 500 }) => {
    const [isInit, setInit] = React.useState(false);
    const [themeColors] = useCurrentTheme();
    const iconColor = themeColors.textColor;

    const setInitTrue = () => {
        !isInit && setInit(true)
    }

    React.useEffect(() => {
        setTimeout(setInitTrue, delay);

    }, [isInit])



    if (isInit) return (
<Animated.View entering={FadeIn.duration(500)}>
        <View key={category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <View style={styles.categoryIcons}>
                {ICONS_SETS[category].map(icon => {
                    let isCurrent = icon === currentIcon;
                    return (
                        <TouchableOpacity {...{
                            onPress: () => onChangeInput("icon", icon),
                            key: icon,
                            style: [styles.categoryIcon, isCurrent && styles.categoryIconActive]
                        }}>
                            <IconGlob name={icon} color={isCurrent ? themeColors.tabsActiveColor : iconColor} size={22} />
                            {isCurrent && <View style={styles.active_icon_bg} />}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
        </Animated.View>
    )
}

export default SCIcon