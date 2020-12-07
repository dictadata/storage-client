/**
 * @dictadata/client
 */
"use strict"

exports.Roles = require("./roles")
exports.Account = require('./account')

exports.Accounts = require("./accounts")
exports.Settings = require("./settings")
exports.Notify = require("./notify")
exports.Storage = require("./storage")
exports.Import = require("./import")
exports.Docs = require("./docs")
exports.Codex = require("./codex")

// access to the HTTP connection (Axios)
exports.DictaAPI = require('./dictaAPI')

// userPlugin for vue; access as app.$user or this.$user
exports.UserPlugin = require('./plugins/userPlugin').UserPlugin
exports.UserPluginV3 = require('./plugins/userPluginV3').UserPlugin
