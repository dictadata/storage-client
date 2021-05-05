/**
 * @dictadata/client
 */
"use strict"

export { Roles } from "./roles.js"
export { default as Account } from './account.js'

export { default as Accounts } from "./accounts.js"
export { default as Settings } from "./settings.js"
export { default as Notify } from "./notify.js"
export { default as Storage } from "./storage.js"
export { default as Upload } from "./upload.js"
export { default as Docs } from "./docs.js"
export { default as Codex } from "./codex.js"

// direct access to the HTTP connection (Axios)
export { default as DictaAPI } from './dictaAPI.js'

// userPlugin for vue; access as app.$user or this.$user
export { UserPlugin } from './plugins/userPlugin.js'
export { UserPluginV3 } from './plugins/userPluginV3.js'
