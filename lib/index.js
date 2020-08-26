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

// access to the HTTP connection (Axios)
exports.DictaAPI = require('./dictaAPI')

// userPlugin for vue; access as vue.$user or this.$user
exports.UserPlugin = require('./plugins/userPlugin').UserPlugin
