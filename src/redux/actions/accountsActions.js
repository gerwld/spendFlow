const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

const ADD_ACCOUNT = 'accounts/ADD_ACCOUNT';
const EDIT_ACCOUNT = 'accounts/EDIT_ACCOUNT';
const DELETE_ACCOUNT = 'accounts/DELETE_ACCOUNT';
const SWAP_ACCOUNTS_IDS = 'accounts/SWAP_ACCOUNTS_IDS'


const initializeAccounts = (payload, payloadIDs) => ({
  type: ADD_ACCOUNT,
  payload,
  payloadIDs
});

const addAccount = (payload) => async (dispatch, getState) => {
    await dispatch({
      type: ADD_ACCOUNT,
      payload,
  });

  await setAccountsToAsyncStorage(getState);
};

const editAccount = (payload, itemID) => async (dispatch, getState) => {
  await dispatch({
    type: EDIT_ACCOUNT,
    payload,
    itemID
});

await setAccountsToAsyncStorage(getState);
};

const deleteAccount = (itemID) => async (dispatch, getState) => {
  await dispatch({
    type: DELETE_ACCOUNT,
    itemID
});

await setAccountsToAsyncStorage(getState);
};

const swapAccountsIDs = (payload) => async (dispatch, getState) => {
  await dispatch({
    type: SWAP_ACCOUNTS_IDS,
    payload,
});

await setAccountsToAsyncStorage(getState);
};

const setAccountsToAsyncStorage = async (getState) => {
  const { items, itemsIdsArray } = getState().accounts;
  try {
      await AsyncStorage.setItem('@accounts/items', JSON.stringify(items));
      await AsyncStorage.setItem('@accounts/itemsIdsArray', JSON.stringify(itemsIdsArray));
  } catch (e) {
      console.error('Failed to save accounts state to storage', e);
  }
}

module.exports = {
  ADD_ACCOUNT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  SWAP_ACCOUNTS_IDS,
  addAccount,
  editAccount,
  deleteAccount,
  swapAccountsIDs,
  initializeAccounts
} 