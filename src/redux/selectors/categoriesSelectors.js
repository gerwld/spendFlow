import { createSelector } from 'reselect';



// Selectors for app state
export const selectCategories = state => state.categories.items;
export const selectCategoriesArray = state => state.categories.itemsIdsArray;


// sfbdfb
export const selectAppLang = state => state.app.lang;
export const isHabitsInit = s => s.habits.isInit
const getAppState = state => state.app;



export const selectCategoriesAndIDs = createSelector(
  [selectCategories, selectCategoriesArray],
  (categories, categoriesArray) => ({
    categories, categoriesArray
  })
 )






// sdvd 
export const selectAppTheme = createSelector(
  [getAppState],
  appState => ({
    theme: appState.theme,
    system_theme: appState.system_theme
  })
);

export const selectAppThemeAndLang = createSelector(
    [selectAppLang, selectAppTheme],
     (lang, theme) => ({
      lang, theme
  }))


