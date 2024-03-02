/**
 * test/user/user_login.js
 */
"use strict"

import StorageAPI from "../../storage/client/storage-api.js"
import Account from "../../storage/client/account.js"
import $user from '../../storage/client/user.js'

StorageAPI.baseURL = "http://dev.dictadata.net"

async function test_1() {
  console.log("--- $user.login")

  try {
    let user = { userid: "user", password: "user" }

    let results = await $user.login(user)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log("results: " + JSON.stringify(results.data[user.userid]))
    console.log()
    console.log("$user: " + JSON.stringify($user))
    console.log()
    console.log("isAuthenticated: " + $user.isAuthenticated)
    console.log("isLocal: " + $user.isLocal)
  }
  catch (err) {
    console.warn("error: " + err.message);
  }
}

async function test_2() {
  console.log("--- $user.changeUser")

  try {
    let user = { userid: "user", password: "user" }

    let results = await $user.login(user, true)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log("results: " + JSON.stringify(results.data[user.userid]))
    console.log()
    console.log("$user: " + JSON.stringify($user))
    console.log()
    console.log("isAuthenticated: " + $user.isAuthenticated)
    console.log("isLocal: " + $user.isLocal)
  }
  catch (err) {
    console.warn("error: " + err.message);
  }
}

(async () => {
  console.log("=== test: $user logins")
  console.log("$user: " + JSON.stringify($user))

  if (await test_1()) return
  console.log()
  if (await test_2()) return
  console.log("done.")
})()
