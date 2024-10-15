const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

const ADD_ACCOUNT = 'accounts/ADD_ACCOUNT';

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



const setAccountsToAsyncStorage = async (getState) => {
  const app = getState().app;
  try {
      await AsyncStorage.setItem('@accounts', JSON.stringify(app));
  } catch (e) {
      console.error('Failed to save accounts state to storage', e);
  }
}

module.exports = {
  ADD_ACCOUNT,
  addAccount,
  initializeAccounts
} 