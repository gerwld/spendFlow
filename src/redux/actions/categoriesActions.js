const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

const ADD_CATEGORY = 'categories/ADD_CATEGORY';
const EDIT_CATEGORY = 'categories/EDIT_CATEGORY';
const DELETE_CATEGORY = 'categories/DELETE_CATEGORY';
const SWAP_CATEGORIES_IDS = 'categories/SWAP_CATEGORIES_IDS';


const addCategory = (payload) => async (dispatch, getState) => {
    await dispatch({
      type: ADD_CATEGORY,
      payload,
  });

  await setCategoriesToAsyncStorage(getState);
};

const editCategory = (payload, itemID) => async (dispatch, getState) => {
  await dispatch({
    type: EDIT_CATEGORY,
    payload,
    itemID
});

await setCategoriesToAsyncStorage(getState);
};

const deleteCategory = (itemID) => async (dispatch, getState) => {
  await dispatch({
    type: DELETE_CATEGORY,
    itemID
});

await setCategoriesToAsyncStorage(getState);
};

const swapCategoriesIDs = (payload) => async (dispatch, getState) => {
  await dispatch({
    type: SWAP_CATEGORIES_IDS,
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
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  SWAP_CATEGORIES_IDS,
  addCategory,
  editCategory,
  deleteCategory,
  swapCategoriesIDs
} 