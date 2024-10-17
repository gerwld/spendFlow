const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

const ADD_CATEGORY = 'categories/ADD_CATEGORY';

const initializeCategories = (payload, payloadIDs) => ({
  type: ADD_CATEGORY,
  payload,
  payloadIDs
});

const addCatergory = (payload) => async (dispatch, getState) => {
    await dispatch({
      type: ADD_CATEGORY,
      payload,
  });

  await setCategoriesToAsyncStorage(getState);
};



const setCategoriesToAsyncStorage = async (getState) => {
  const { items, itemsIdsArray } = getState().categories;
  try {
      await AsyncStorage.setItem('@categories/items', JSON.stringify(items));
      await AsyncStorage.setItem('@categories/itemsIdsArray', JSON.stringify(itemsIdsArray));
  } catch (e) {
      console.error('Failed to save categories state to storage', e);
  }
}

module.exports = {
  ADD_CATEGORY,
  addCatergory,
  initializeCategories
} 