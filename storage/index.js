/**
 * @dictadata/client
 */

// client API classes
export { default as StorageAPI } from './client/storage-api.js'
// node-api
export { default as Accounts } from "./client/accounts.js"
export { default as UserAPI } from "./client/user-api.js"
export { default as Engrams } from "./client/engrams.js"
export { default as Tracts } from "./client/tracts.js"
export { default as Storage } from "./client/storage.js"
export { default as ETL } from "./client/etl.js"
// dicta-api
export { default as Docs } from "./client/docs.js"
export { default as Notify } from "./client/notify.js"
export { default as Settings } from "./client/settings.js"
export { default as Files } from "./client/files.js"

// client types
export { default as Account } from './client/account.js'
export { Roles } from "./client/types/roles.js"

// storage-junction types
export { default as Engram } from './client/types/engram.js'
export { default as Field } from './client/types/field.js'
export { default as SMT } from './client/types/smt.js'
// engrams types
export { default as Entry } from './client/types/entry.js'

// storage-junction utils
export { default as dotPick } from './client/utils/dot.js'
export { default as formatDate } from './client/utils/formatDate.js'
export { default as hasOwnProperty } from './client/utils/hasOwnProperty.js'
export { default as numberValue } from './client/utils/numberValue.js'
export { default as typeOf } from './client/utils/typeOf.js'
export { default as objCopy } from './client/utils/objCopy.js'

// access via Vue plugin in Vue components as this.$user
export { UserPlugin } from './client/plugins/userPlugin.js'
export { UserPluginV3 } from './client/plugins/userPluginV3.js'
