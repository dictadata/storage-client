/**
 * @dictadata/client
 */
"use strict"

// client API classes
export { default as DictaDataAPI } from './dictaDataAPI.js'
export { default as Accounts } from "./accounts.js"
export { default as Settings } from "./settings.js"
export { default as Notify } from "./notify.js"
export { default as Codex } from "./codex.js"
export { default as Storage } from "./storage.js"
export { default as Upload } from "./upload.js"
export { default as Docs } from "./docs.js"

// client types
export { Roles } from "./roles.js"
export { default as Account } from './account.js'

// access via Vue plugin in Vue components as this.$user
export { UserPlugin } from './plugins/userPlugin.js'
export { UserPluginV3 } from './plugins/userPluginV3.js'
