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

export const selectCategoryByID = createSelector(
  [selectCategories, (_, categoryID) => categoryID],
  (items, categoryID) => items[categoryID]
)

