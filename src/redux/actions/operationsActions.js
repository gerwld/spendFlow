const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

const ADD_OPERATION = 'operations/ADD_OPERATION';

const initializeOperations = (payload, payloadIDs) => ({
  type: ADD_OPERATION,
  payload,
  payloadIDs
});

const addOperation = (payload) => async (dispatch, getState) => {
    await dispatch({
      type: ADD_OPERATION,
      payload,
  });

  await setOperationsToAsyncStorage(getState);
};



const setOperationsToAsyncStorage = async (getState) => {
  const { items, itemsIdsArray } = getState().operations;
  try {
      await AsyncStorage.setItem('@operations/items', JSON.stringify(items));
      await AsyncStorage.setItem('@operations/itemsIdsArray', JSON.stringify(itemsIdsArray));
  } catch (e) {
      console.error('Failed to save operations state to storage', e);
  }
}

module.exports = {
  ADD_OPERATION,
  addOperation,
  initializeOperations
} 