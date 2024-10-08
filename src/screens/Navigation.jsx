import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Overview from "./Overview";
import { useTranslation } from "react-i18next";
import TutorialScreen from "./TutorialScreen";
import DetailsHabitScreen from "./DetailsHabitScreen";
import SettingsScreen from "./SettingsScreen";
import AHSRepeat from "./subsreens/AHSRepeat";
import STLanguage from "./subsreens/STLanguage";
import STTheme from "./subsreens/STTheme";
import SetHabitScreen from "./SetHabitScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { useCurrentTheme } from "hooks";
import * as SystemUI from 'expo-system-ui';
import { Platform, StyleSheet, View} from "react-native";
import DetailsHabitScreenAndroid from "./DetailsHabitScreenAndroid";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BlurView } from 'expo-blur';

import OperationsScreen from './OperationsScreen';
import AccountsScreen from './AccountsScreen';
import MoreScreen from './MoreScreen';

import { Wallet } from 'lucide-react-native';
import { Grip } from 'lucide-react-native';
import { ChartPie } from 'lucide-react-native';
import { HandCoins } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {


    const { t } = useTranslation();
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
        return  <BottomTabBar
        {...props}
        style={{ backgroundColor: 'red', elevation: 0, height: 100 }} // Additional styling
      />
    }

    
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        tabBar: (props) => <RenderTabBarParent {...props} />,
        navigationBarColor: themeColors.navigationBarColor || "black",
        tabBarActiveTintColor: themeColors.tabsActiveColor,
        tabBarInactiveTintColor: themeColors.tabsColor,
        tabBarLabelStyle: {fontSize: 12.5},
        tabBarOptions: {
            style: {
              height: 90,
            },
            tabStyle: {
              height: 60,
            },
          },
        tabBarItemStyle: {
            "height": 54
        },
        tabBarStyle: [{display: "flex", height: insets.bottom + 60, position: "absolute",  bottom: 0 }, Platform.OS === "android" && {paddingBottom: 10, borderTopColor: themeColors.background, borderTopWidth: 1}],
        tabBarBackground: () => (
        Platform.OS === "fgn"
         ? <BlurView tint={themeColors.label} intensity={100} style={[StyleSheet.absoluteFill]} />
         : <View style={[StyleSheet.absoluteFill, {backgroundColor: themeColors.bgHighlight}]}/>
        ),
        tabBarIcon: ({ focused, color, size }) => {
            let TabIcon = null;
            let width = 30;
            let stroke = 2;

            if(route.name === "overview_tab") {
                TabIcon = ChartPie;
                width = 22;
                stroke = 2.5;
            }
            if(route.name === "operations_tab") TabIcon = HandCoins
            if(route.name === "more_tab") TabIcon = Grip
            if(route.name === "accounts_tab") {
                TabIcon = Wallet;
                width = 24;
            } 

            if(TabIcon)
            return <TabIcon 
            strokeWidth={stroke}
            width={width}
            height={26}
            stroke={focused ? themeColors.tabsActiveColor : themeColors.tabsColor}/>
        }
    })}>
        <Tab.Screen name="overview_tab" component={Overview} options={{ headerShown: false, title: "Overview" }} />
        <Tab.Screen name="operations_tab" component={OperationsScreen} options={{ headerShown: false, title: "Operations" }} />
        <Tab.Screen name="accounts_tab" component={AccountsScreen} options={{ headerShown: false, title: "Accounts" }} />
        <Tab.Screen name="more_tab" component={MoreScreen} options={{ headerShown: false, title: "More" }} />
      
    </Tab.Navigator>
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


    const EditHabitScreen = (props) => <SetHabitScreen isEdit {...props}/>

    const addEditSubdirectories = (
        <>
            <Stack.Screen name="addhabit" component={SetHabitScreen} options={{ headerShown: false, title: t("addt_screen") }} />
            <Stack.Screen name="edithabit" component={EditHabitScreen} options={{ headerShown: false, title: t("addt_screen") }} />
            <Stack.Screen name="sethabit/repeat" component={AHSRepeat} options={{ headerShown: false, title: "Repeat" }} />
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
            }}
            />
            <Stack.Screen name="settings/language" component={STLanguage} options={{ headerShown: false, title: t("st_screen"), }} />
            <Stack.Screen name="settings/theme" component={STTheme} options={{ headerShown: false, title: t("st_screen") }} />
        </>
    )

    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: themeColors.background || "white"}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ 
                gestureEnabled: true, 
                navigationBarColor: themeColors.bgHighlight || "black" }}>
                <Stack.Screen name="home" component={MyTabs} options={{ headerShown: false, title: t("home_screen") }} />
              
              {Platform.OS === "android"  || Platform.OS === "web" 
              ? <Stack.Screen name="habitdetails" component={DetailsHabitScreenAndroid} options={{ headerShown: false, title: "Habit Details", animation:"fade" }} />
              : <Stack.Screen name="habitdetails" component={DetailsHabitScreen} options={{ headerShown: false, title: "Habit Details" }} />
            }
                
                {settingsSubdirectories}
                {addEditSubdirectories}
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
