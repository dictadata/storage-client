/**
 * test/user/user_login.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Account from "../../lib/account.js"
import $user from '../../lib/user.js'

DictaDataAPI.baseURL = "http://dev.dictadata.org:8089"
/*
DictaDataAPI.$user.userid = "admin"
DictaDataAPI.$user.password = "admin"
DictaDataAPI.$user.roles = [ "User", "Admin" ]
*/

async function test_1() {
  console.log("=== login with account")

  try {
    let user = { userid: "user", password: "user" }

    let account = await $user.login(user)
    console.log("account: " + JSON.stringify(account))
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
  console.log("=== login with guest")

  let user = { userid: "dicta", password: "data" }

  $user.login(user, true)
    .then((account) => {
      console.log("account: " + JSON.stringify(account))
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
