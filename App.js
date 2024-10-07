import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";

import { Navigation } from "screens/Navigation";
import withTranslation from "hocs/withTranslation";
import { useInitializeAppDemo, useOrientationLock } from "hooks";
import { appSelectors, store } from "@redux";
import i18n from "./i18n";

import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import { getThemeStatusBar } from "@constants";
import { StatusBar } from "react-native";

// keeps the splash screen visible while app fetch resources
SplashScreen.preventAutoHideAsync();

function AppWithProvider({ children }) {
  // useOrientationLock();

  const lang = useSelector(appSelectors.selectAppLang);
  // useInitializeApp(lang);
  useInitializeAppDemo(lang);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return children;
}

export default withTranslation(function RootComponent() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppWithProvider>
          <Navigation />
        </AppWithProvider>
      </GestureHandlerRootView>
    </Provider>
  );
});
