import { createSelector } from 'reselect';

// Selectors for app state
export const selectAccounts = state => state.accounts.items;
export const selectAccountsArray = state => state.accounts.itemsIdsArray;


export const selectAccountsAndIDs = createSelector(
  [selectAccounts, selectAccountsArray],
  (accounts, accountsArray) => ({
    accounts, accountsArray
  })
 )

export const selectAccountByID = createSelector(
  [selectAccounts, (_, accountID) => accountID],
  (items, accountID) => items[accountID]
)

