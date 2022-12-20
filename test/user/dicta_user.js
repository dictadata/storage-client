/**
 * test/user/dicta_user.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Account from "../../lib/account.js"
import $user from '../../lib/user.js'
import Accounts from "../../lib/accounts.js"

DictaDataAPI.baseURL = "http://dev.dictadata.org"
/*
DictaDataAPI.$user.userid = "admin"
DictaDataAPI.$user.password = "admin"
DictaDataAPI.$user.roles = [ "User", "Admin" ]
*/

/**
 * User
 */
async function userTests() {
  let userid = 'tester'
  let password = 'testy'
  let roles = [ "User" ]
  let user = { userid, password }
  let account = new Account(user);

  console.log("=== user register")
  try {
    account = await $user.register(account)
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("account: " + JSON.stringify(account))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
  }

  console.log("=== user login")
  try {
    account = await $user.login(user)
    $user.password = user.password  // since there is no auth handler in test mode
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("account: " + JSON.stringify(account))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
    return
  }

  console.log("=== user update")
  try {
    $user.profile.displayName = "Tester the Testy"
    account = await $user.update()
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("account: " + JSON.stringify(account))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
    return
  }

  console.log("=== user logout")
  try {
    let result = await $user.logout()
    //$user.password = user.password  // since there is no auth handler in test mode
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("result: " + JSON.stringify(result))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
    return
  }

  console.log("=== user dull")
  try {
    await $user.login(new Account({ userid: "admin", password: "admin" }))

    let accounts = new Accounts()
    let result = await accounts.dull(user)
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("result: " + JSON.stringify(result))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()

    await $user.logout()
  }
  catch (err) {
    console.warn(err.message)
    return
  }

}

// test runner
(async function main() {
  console.log("dictadata-client tests")
  await userTests()
  console.log("done.")
})()
