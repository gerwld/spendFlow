import React, { useCallback } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Dimensions, Platform } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated';

import { BaseView, STHeader } from '@components';
import { COLORS_ARRAY } from '@constants';
import { useCurrentTheme } from 'hooks';
import { LucideCheck } from 'lucide-react-native';

const { width: screenWidth } = Dimensions.get("window");

const GAP = 5;
const BLOCKS_IN_ROW = Platform.OS === "android" ? 5 : 7;
const BLOCK_SIZE = (screenWidth - 30 - GAP * (BLOCKS_IN_ROW)) / BLOCKS_IN_ROW;
const FIRST_PORTION = Platform.OS === "android" ? 20 : 50;

const SCColor = ({ route, navigation }) => {
    const [themeColors] = useCurrentTheme();
    const [state, setState] = React.useState({
        ...route.params.state
    });

    const iconColor = themeColors.textColor;
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
        categoryColors: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: GAP,
            marginBottom: 24
        },
        categoryColor: {
            flexGrow: 1,
            flexShrink: 0,
            flexBasis: BLOCK_SIZE,
            position: "relative",
            minWidth: BLOCK_SIZE,
            maxWidth: BLOCK_SIZE,
            height: BLOCK_SIZE,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: "hidden"
        },
        categoryColorActive: {
            borderWidth: 2,
            borderColor: state.categoryColor !== "gray" ? state.categoryColor : themeColors.tabsActiveColor,
        },
        active_icon_bg: {
            position: "absolute",
            ...StyleSheet.absoluteFill,
            backgroundColor: state.categoryColor !== "gray" ? state.categoryColor : themeColors.tabsActiveColor,
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
    }, [state, route])

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
                bgColor={state.color}
                onGoBack={handleGoBack}
                navigation={navigation}
                title={"Color"}
            />

            <ScrollView>

                <View style={styles.content}>

                    <Text style={styles.categoryTitle}>Colors</Text>
                    <View style={styles.categoryColors}>
                        {COLORS_ARRAY.map((color, index) => {
                            return <CategoryBlock {...{
                                styles,
                                key: color,
                                color,
                                onChangeInput,
                                currentColor: state.categoryColor,
                                index,
                                delay: (index > FIRST_PORTION) ? (FIRST_PORTION * (index - FIRST_PORTION) * 0.1) : 100 // for shift
                            }} />
                        })}

                    </View>
                </View>
            </ScrollView>


        </BaseView>
    )
}

const CategoryBlock = ({ styles, currentColor, color, onChangeInput, index, delay = 0 }) => {
    const [isInit, setInit] = React.useState(true);
    const [themeColors] = useCurrentTheme();
    const isCurrent = currentColor === color;

    const setInitTrue = () => {
        !isInit && setInit(true)
    }

    React.useEffect(() => {
        setTimeout(setInitTrue, delay);

    }, [isInit])

    const renderContent = (
        <TouchableOpacity {...{
            onPress: () => onChangeInput("categoryColor", color),
            style: [styles.categoryColor, isCurrent && styles.categoryColorActive, { backgroundColor: color }]
        }}>
            {isCurrent && <LucideCheck color={"white"} strokeWidth={3} />}
        </TouchableOpacity>
    )

    if (!isInit) return null;
    if (Platform.OS === "android") return renderContent;

    return (
        <Animated.View entering={FadeIn.duration(300)}>
            {renderContent}
        </Animated.View>
    )
    
}

export default SCColor