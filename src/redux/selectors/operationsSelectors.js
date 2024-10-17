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


/**
 * createSelector callback that recieves `timestampMin, timestampMax`
 * and returns memoized portion of timestamps range, which helps to avoid unnecessary re-renders.
 * @param {object} state - returned redux state object.
 * @param {string} timestampMin - from which included) timestamp select.
 * @param {string} timestampMax - to which (included) timestamp select.
 * @returns {array} - returns memoized portion of specified operations in specified range. 
 */
export const selectOperationsPortionMinMax = createSelector(
  [selectOperationsAndIDs, (_, timestampMin) => timestampMin, (_, __, timestampMax) => timestampMax],
  (items, timestampMin, timestampMax) => {
    if (!items) return []; 

    const {operations, operationsArray} = items;

    // Validate timestamps
    const min = Number(timestampMin);
    const max = Number(timestampMax);
    if (isNaN(min) || isNaN(max)) return [];

    // only keys of those who's timestamp >= timestampMin and <= timestampMax
    const filteredKeys = operationsArray?.filter(operationID => {
      const itemTimestamp = operations[operationID].timestamp;      
      return (itemTimestamp >= min  && itemTimestamp <= max)
    })    
    
    // Filter the itemsArray based on the timestampMin and timestampMax
    return filteredKeys;
  }
);