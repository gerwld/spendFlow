import { database } from "..";


export async function addOperation(newOperation) {
  await database.write(async () => {
    await database.collections.get('operations').create((operation) => {
      operation.title = newOperation.title;
      operation.categoryID = newOperation.categoryID;
      operation.accountID = newOperation.accountID;
      operation.value = newOperation.value;
      operation.currency = newOperation.currency;
      operation.type = newOperation.type;
      operation.timestamp = newOperation.timestamp;
    });
  });
}

export async function getOperations() {
  const operationsCollection = database.collections.get('operations');
  return await operationsCollection.query().fetch();
}
