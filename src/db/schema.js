import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "operations",
      columns: [
        {name: "title", type: "string", isOptional: true},
        {name: "categoryID", type: "string"},
        {name: "accountID", type: "string"},
        {name: "value", type: "number"},
        {name: "currency", type: "string"},
        {name: "type", type: "string"},
        {name: "timestamp", type: "number"},
      ]
    })
  ]
})