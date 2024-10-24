import { createSelector } from 'reselect';

// Selectors for app state
export const selectCategories = state => state.categories.items;
export const selectCategoriesArray = state => state.categories.itemsIdsArray;


export const selectCategoriesAndIDs = createSelector(
  [selectCategories, selectCategoriesArray],
  (categories, categoriesArray) => ({
    categories, categoriesArray
  })
 )

 export const selectCategoriesArrayMemoizedStrict = (() => {  
  let prevCategoriesArrayLength = null;  
  let prevResult = null;  
  return createSelector(
    [selectCategoriesArray, (_, forceUpdate) => forceUpdate],
    (categoriesArray, forceUpdate) => {      
      if (forceUpdate || prevCategoriesArrayLength !== categoriesArray.length) {        
        prevCategoriesArrayLength = categoriesArray.length;        
        prevResult = categoriesArray.slice(); // slice to avoid direct reference
      }      
      return prevResult;    
    }
  );
})();


export const selectCategoryByID = createSelector(
  [selectCategories, (_, categoryID) => categoryID],
  (items, categoryID) => items[categoryID] 
)

