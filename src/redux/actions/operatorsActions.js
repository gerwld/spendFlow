
const ADD_OPERATION = 'operations/ADD_OPERATION';

const initializeOperations = (payload, payloadIDs) => ({
  type: ADD_OPERATION,
  payload,
  payloadIDs
});

module.exports = {
  initializeOperations
} 