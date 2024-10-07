import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
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
import { Platform } from "react-native";
import DetailsHabitScreenAndroid from "./DetailsHabitScreenAndroid";



const Stack = createNativeStackNavigator();

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

    const config = {
        animation: "spring",  // A smooth spring-like animation
        config: {
          stiffness: 800,     // Higher value = more resistance
          damping: 450,       // How bouncy the animation is
          mass: 2,            // Adjust the weight of the component
          overshootClamping: true, // Prevent the spring from overshooting
          restDisplacementThreshold: 0.001,  // When to stop moving
          restSpeedThreshold: 0.001,         // When to stop oscillating
        },
      };
      
 

    const settingsSubdirectories = (
        <>
<Stack.Screen
  name="settings"
  component={SettingsScreen}
  options={{
    headerShown: false,
    title: t("st_screen"),
    animation: "fade_from_bottom",  // Custom animation when opening the screen (enters from the left)
    gestureDirection: "horizontal-inverted",  // Swipe from right-to-left to close
    // gestureResponseDistance: {
    //   horizontal: 150, // Adjust the swipe sensitivity (how far you need to swipe to close)
    // },
  
        // gestureDirection: 'horizontal',
        headerShown: false,
    //   gestureEnabled: false,

        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    // transitionSpec: {
    //   open: config,   // Animation config when opening
    //   close: config,  // Animation config when closing
    // },
    animationDuration: 150, // Duration for the transition
  }}
/>


            <Stack.Screen name="settings/language" component={STLanguage} options={{ headerShown: false, title: t("st_screen"), }} />
            <Stack.Screen name="settings/theme" component={STTheme} options={{ headerShown: false, title: t("st_screen") }} />
        </>
    )

    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: themeColors.background || "white"}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ gestureEnabled: true, navigationBarColor: themeColors.background || "white" }}>
                <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false, title: t("home_screen") }} />
              
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



// gestureEnabled: true, // Enable gestures for swipe-down-to-close
// gestureDirection: 'vertical', // Vertical gesture (from top or bottom)
// cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Bottom-to-top transition