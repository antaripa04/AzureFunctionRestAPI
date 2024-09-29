const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const account = "restapifa";

const credential = new AzureNamedKeyCredential(account, process.env.AZURE_STORAGE_ACCESS_KEY);

const insertEntity = async (tableName, entity) => {
  const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
  await client.createEntity(entity);
};

exports.insertEntity = insertEntity;
