/**
 * @dictadata/client
 */
"use strict"

// client API classes
export { default as DictaDataAPI } from './dictadata-api.js'
// node-api
export { default as Codex } from "./codex.js"
export { default as Storage } from "./storage.js"
export { default as Tracts } from "./tracts.js"
export { default as Accounts } from "./accounts.js"
export { default as UserAPI } from "./user-api.js"
// dicta-api
export { default as Docs } from "./docs.js"
export { default as Notify } from "./notify.js"
export { default as Settings } from "./settings.js"
export { default as Files } from "./files.js"

// client types
export { default as Account } from './account.js'
export { Roles } from "./types/roles.js"

// storage-junction types
export { default as Engram } from './types/engram.js'
export { default as Field } from './types/field.js'
export { default as SMT } from './types/smt.js'
// codex types
export { default as Entry } from './types/entry.js'

// storage-junction utils
export { default as dotPick } from './utils/dotPick.js'
export { default as formatDate } from './utils/formatDate.js'
export { default as hasOwnProperty } from './utils/hasOwnProperty.js'
export { default as numberValue } from './utils/numberValue.js'
export { default as typeOf } from './utils/typeOf.js'

// access via Vue plugin in Vue components as this.$user
export { UserPlugin } from './plugins/userPlugin.js'
export { UserPluginV3 } from './plugins/userPluginV3.js'
