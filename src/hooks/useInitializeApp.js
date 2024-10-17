import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appActions, habitsActions } from "@actions";
import i18n from '../../i18n';
import { LogBox, useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { getLocales } from 'expo-localization';
import { LANG_MASKS } from '@constants';


LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

// hook initializer
const useInitializeApp = (lang) => {
    const d = useDispatch();

    // STEP 1: assign parts as functions to get state portions 
    const loadBase = async () => {
        try {
            const storedSet = await AsyncStorage.getItem('@settings');
            if (storedSet !== null) {
                let set = JSON.parse(storedSet);
                delete set.system_theme;
                d(appActions.initializeApp(set));
            }
        } catch (e) {
            console.error('Failed to load settings from storage', e);
        }
    };

    const loadChunkFromStorage = async (name, actionType, actionInitType, isHashmap) => {
        try {
            const storedItems = await AsyncStorage.getItem(`@${name}/items`);

            if(isHashmap) {
                const storedIDs = await AsyncStorage.getItem(`@${name}/itemsIdsArray`);
                if (storedItems !== null && storedIDs !== null) 
                    d({type: actionType, items: JSON.parse(storedItems), itemsIdsArray:JSON.parse(storedIDs)});
            } 

            else if (storedItems !== null) 
                d({type: actionType, items: JSON.parse(storedItems)});
            
        } catch (e) {
            console.error(`Failed to load ${name} from storage`, e);
        }
        actionInitType && d({ type: actionInitType, payload: true });
    };

    const loadOperations = async () => loadChunkFromStorage("operations", "OPERATIONS_SATURATE_FROM_STORAGE", "SET_OPERATIONS_INIT", true);
    const loadAccounts = async () => loadChunkFromStorage("accounts", "ACCOUNTS_SATURATE_FROM_STORAGE", "SET_ACCOUNTS_INIT", true);
    const loadCategories = async () => loadChunkFromStorage("categories", "CATEGORIES_SATURATE_FROM_STORAGE", "SET_CATEGORIES_INIT", true);


    // STEP 2: call those functions
    useEffect(() => {
        loadBase();
        loadAccounts()
        loadCategories()
        loadOperations()
    }, []);

    // STEP 3: set i18n in with provider part of App
    useEffect(() => {
        const languagesList = Object.keys(LANG_MASKS);
        const userPreferredLanguages = getLocales().map(e => e.languageCode);
    
        // Function to get the first valid language from the list
        const getValidLanguage = (languages) => {
            for (const lang of languages) {
                if (languagesList.includes(lang)) {
                    return lang;
                }
            }
            return 'en'; // Default fallback language
        };
    
        // Determine the language to use
        let locale_set = lang; // lang = appReducer.lang
    
        if (!locale_set || !languagesList.includes(locale_set)) { 
            locale_set = getValidLanguage([lang, ...userPreferredLanguages, 'en']);
            console.log(locale_set)
            d(appActions.setLang(locale_set));
        }

        if(i18n.locale !== locale_set) {
            i18n.locale = locale_set;
            i18n.changeLanguage(locale_set);
        }
    }, [lang]);
    

    // STEP 4: initialize system kind of theme (scheme)
    const payload = useColorScheme();
    const colorScheme = Appearance.getColorScheme();
    
    useEffect(() => {        
        d(appActions.setSystemTheme(payload))
    }, [payload, colorScheme])
    
};

export default useInitializeApp;
