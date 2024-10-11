
const ADD_CATEGORY = 'operations/ADD_CATEGORY';

const initializeCategories = (payload, payloadIDs) => ({
  type: ADD_CATEGORY,
  payload,
  payloadIDs
});

module.exports = {
  initializeCategories
} 