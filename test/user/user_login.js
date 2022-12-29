/**
 * test/user/user_login.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Account from "../../lib/account.js"
import $user from '../../lib/user.js'

DictaDataAPI.baseURL = "http://dev.dictadata.org"

async function test_1() {
  console.log("=== $user.login authenticate")

  try {
    let user = { userid: "user", password: "user" }

    let results = await $user.login(user)
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
  console.log("=== $user.login local guest")

  let user = { userid: "dicta", password: "data" }

  $user.login(user, true)
    .then((results) => {
      console.log("results: " + JSON.stringify(results.data[user.userid]))
      console.log()
      console.log("$user: " + JSON.stringify($user))
      console.log()
      console.log("isAuthenticated: " + $user.isAuthenticated)
      console.log("isLocal: " + $user.isLocal)
      })
    .catch((error) => {
      console.warn("error: " + error)
    })

}

(async () => {
  console.log("=== tests: user login")
  console.log("$user: " + JSON.stringify($user))

  if (await test_1()) return
  console.log()
  if (await test_2()) return
  console.log("done.")
})()
