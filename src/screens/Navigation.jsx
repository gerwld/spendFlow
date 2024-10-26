import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import ReportScreen from "./ReportScreen";
import { useTranslation } from "react-i18next";
import TutorialScreen from "./TutorialScreen";
import SettingsScreen from "./SettingsScreen";
import STLanguage from "./subsreens/STLanguage";
import STTheme from "./subsreens/STTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { useCurrentTheme } from "hooks";
import * as SystemUI from 'expo-system-ui';
import { Platform, StyleSheet, View } from "react-native";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from "expo-constants";


import HomeScreen from './HomeScreen';
import AccountsScreen from './AccountsScreen';
import MoreScreen from './MoreScreen';

import { Home, Wallet } from 'lucide-react-native';
import { Grip } from 'lucide-react-native';
import { ChartPie } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedAppLoader from './AnimatedAppLoaderScreen';
import SetCategoryScreen from './SetCategoryScreen';
import SCIcon from './subsreens/SCIcon';
import SCColor from './subsreens/SCColor';
import SCOperationType from './subsreens/SCOperationType';
import SetAccountScreen from './SetAccountScreen';
import SCAccountType from './subsreens/SCAccountType';
import { StatusBar } from 'expo-status-bar';
import EditCategoriesScreen from './EditCategoriesScreen';
import EditAccountsScreen from './EditAccountsScreen';

import OperationDetailsScreen from './details/OperationDetailsScreen';
import CategoryDetailsScreen from './details/CategoryDetailsScreen';
import AccountDetailsScreen from './details/AccountDetailsScreen';
import FAQScreen from './more/FAQScreen';
import AboutMoreScreen from './more/AboutMoreScreen';
import StatsMoreScreen from './more/StatsMoreScreen';
import PremiumMoreScreen from './more/PremiumMoreScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function MyTabs() {
    const {t} = useTranslation();
    const [themeColors] = useCurrentTheme();
    const insets = useSafeAreaInsets()

    const navTheme = DefaultTheme;
    navTheme.colors = {
        primary: 'rgb(0, 122, 255)',
        card: 'rgb(255, 255, 255)',
        text: themeColors.textColorHighlight,
        border: themeColors.borderColor,
        notification: 'rgb(255, 59, 48)',
        background: themeColors.background
    };

    SystemUI.setBackgroundColorAsync(themeColors.background || "white");

    const RenderTabBarParent = (props) => {
        const bottomGap = Platform.OS === "android" ? 8 : 0;
        return (
            <>
             <BottomTabBar
                {...props}
                style={{
                    
                    elevation: 0,
                    height: insets.bottom + 55 + bottomGap + (Platform.OS === "web" ? 10 : 0)
                }}
             />
             <StatusBar translucent style={themeColors.label === "light" ? "dark" : "light"} />
            </>)
           
    }

    const renderIcon = (focused, route) => {
        let TabIcon = null;
        let width = 30;
        let stroke = 2;

        if (route.name === "report_tab") {
            TabIcon = ChartPie;
            width = 22;
            stroke = 2.5;
        }
        if (route.name === "home_tab") TabIcon = Home
        if (route.name === "more_tab") TabIcon = Grip
        if (route.name === "accounts_tab") {
            TabIcon = Wallet;
            width = 24;
        }

        if (TabIcon)
            return <TabIcon
                strokeWidth={stroke}
                width={width}
                height={26}
                stroke={focused ? themeColors.tabsActiveColor : themeColors.tabsColor} />
    }


    return (
        <AnimatedAppLoader
            isInit={[!isNaN(insets.top)]}
            image={{ uri: Constants.expoConfig.splash.image }}
        >
            <Tab.Navigator
                tabBar={(props) => <RenderTabBarParent {...props} />}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: themeColors.tabsActiveColor,
                    tabBarInactiveTintColor: themeColors.tabsColor,
                    tabBarLabelStyle: {
                        fontSize: 12.5,
                        fontWeight: "600",
                        lineHeight: 12.5,
                    },
                    tabBarItemStyle: {
                        height: 55,
                    },
                    tabBarBackground: () =>
                        <View style={[StyleSheet.absoluteFill, { 
                            borderTopWidth: 1,
                            borderTopColor: themeColors.borderColor, 
                            backgroundColor: themeColors.bgHighlightSec 
                        }]} />,
                    tabBarIcon: (prop) => renderIcon(prop.focused, route)
                })}>

                <Tab.Screen name="home_tab" component={HomeScreen} options={{ title: t("home_tab") }} />
                <Tab.Screen name="report_tab" component={ReportScreen} options={{ title:  t("report_tab") }} />
                <Tab.Screen name="accounts_tab" component={AccountsScreen} options={{ title:  t("accounts_tab") }} />
                <Tab.Screen name="more_tab" component={MoreScreen} options={{ title:  t("more_tab")}} />            

            </Tab.Navigator>
        </AnimatedAppLoader>
    );
}

export const Navigation = () => {
    const { t } = useTranslation();
    const [themeColors] = useCurrentTheme();

    const navTheme = DefaultTheme;
    navTheme.colors = {
        primary: 'rgb(0, 122, 255)',
        card: 'rgb(255, 255, 255)',
        text: themeColors.textColorHighlight,
        border: themeColors.borderColor,
        notification: 'rgb(255, 59, 48)',
        background: themeColors.background
    };

    SystemUI.setBackgroundColorAsync(themeColors.background || "white");


    const EditCategoryScreen = (props) => <SetCategoryScreen isEdit {...props} />
    const EditAccountScreen = (props) => <SetAccountScreen isEdit {...props} />

    const getNavigationBarColor = (route) => {
        let color = "black";

        if (route.name === "settings") color = themeColors.background;
        else color = themeColors.background

        return color;
    }

    const detailsScreens =(
        <>
            <Stack.Screen name="transaction_details_screen" component={OperationDetailsScreen} options={{ title: "Transaction Details" }} />
            <Stack.Screen name="category_details_screen" component={CategoryDetailsScreen} options={{ title: "Category Transactions" }} />
            <Stack.Screen name="account_details_screen" component={AccountDetailsScreen} options={{ title: "Account Transactions" }} />
        </>
    )

    const addEditAccounts = (
        <>
            <Stack.Screen name="edit_accounts_screen" component={EditAccountsScreen} options={{ title: "Edit Accounts" }} />
            <Stack.Screen name="editaccount" component={EditAccountScreen} options={{ title: "Edit Account" }} />
            <Stack.Screen name="addaccount" component={SetAccountScreen} options={{ title: "Add Account" }} />
            <Stack.Screen name="setaccount/icon" component={SCIcon} options={{ title: "Icon" }} />
            <Stack.Screen name="setaccount/color" component={SCColor} options={{ title: "Color" }} />
            <Stack.Screen name="setaccount/type" component={SCAccountType} options={{ title: "Type" }} />
        </>
    )

    const addEditCategories = (
        <>
            <Stack.Screen name="edit_categories_screen" component={EditCategoriesScreen} options={{ title: "Edit Categories" }} />
            <Stack.Screen name="editcategory" component={EditCategoryScreen} options={{ title: "Edit Category" }} />
            <Stack.Screen name="addcategory" component={SetCategoryScreen} options={{ title: "Add Category" }} />
            <Stack.Screen name="setcategory/icon" component={SCIcon} options={{ title: "Icon" }} />
            <Stack.Screen name="setcategory/color" component={SCColor} options={{ title: "Color" }} />
            <Stack.Screen name="setcategory/type" component={SCOperationType} options={{ title: "Type" }} />
        </>
    )


    const moreScreens = (
        <>
            <Stack.Screen name="faq_screen" component={FAQScreen} options={{ title: "Frequently Asked Questions" }} />
            <Stack.Screen name="about_screen" component={AboutMoreScreen} options={{ title: "About SpendFlow" }} />
            <Stack.Screen name="stats_screen" component={StatsMoreScreen} options={{ title: "Statistics" }} />
            <Stack.Screen name="premium_screen" component={PremiumMoreScreen} options={{ title: "Explore Premium" }} />
        </>
    )

    const settingsSubdirectories = (
        <>
            <Stack.Screen
                name="settings"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    title: t("st_screen"),
                    animation: "fade_from_bottom",
                    gestureDirection: "horizontal-inverted",
                    headerShown: false,
                    animationDuration: 150,
                    //TransitionPresets.ModalPresentationIOS,
                }}
            />
            <Stack.Screen name="settings__fromright" component={SettingsScreen} options={{ title: t("st_screen"), }} />
            <Stack.Screen name="settings/language" component={STLanguage} options={{ title: t("st_screen"), }} />
            <Stack.Screen name="settings/theme" component={STTheme} options={{ title: t("st_screen") }} />
        </>
    )

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: themeColors.background || "white" }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={({ route }) => ({
                    headerShown: false,
                    gestureEnabled: true,
                    navigationBarColor: getNavigationBarColor(route)
                })}>

                    <Stack.Screen name="home" component={MyTabs} options={{ title: t("home_screen") }} />
                    {settingsSubdirectories}
                    {addEditAccounts}
                    {addEditCategories}
                    {detailsScreens}
                    {moreScreens}

                    <Stack.Screen
                        name="tutorial"
                        component={TutorialScreen}
                        options={{
                            headerShown: false,
                            title: t("tutorial_screen"),
                            animationTypeForReplace: 'push',
                            animation: 'fade'
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
}
