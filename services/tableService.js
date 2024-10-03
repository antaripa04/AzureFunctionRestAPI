const azure = require("azure-storage");

const tableSvc = azure.createTableService("restapifa", process.env.AZURE_STORAGE_ACCESS_KEY);

const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(tableName, entity, { echoContent: true, payloadFormat: "application/json; odata=nometadata" }, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.body);
      }
    });
  });
};
const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(tableName, query, null, { payloadFormat: "application/json;odata=nometadata" }, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.body);
      }
    });
  });
};

const updateEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.mergeEntity(tableName, entity, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const deleteEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.deleteEntity(tableName, entity, (error, result, response) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
exports.updateEntity = updateEntity;
exports.deleteEntity = deleteEntity;
