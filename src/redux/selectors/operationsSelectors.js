import { createSelector } from 'reselect';

// Selectors for app state
export const selectOperations = state => state.operations.items;
export const selectOperationsArray = state => state.operations.itemsIdsArray;


export const selectOperationsAndIDs = createSelector(
  [selectOperations, selectOperationsArray],
  (operations, operationsArray) => ({
    operations, operationsArray
  })
 )

export const selectCategoryByID = createSelector(
  [selectOperations, (_, operationID) => operationID],
  (items, operationID) => items[operationID]
)

