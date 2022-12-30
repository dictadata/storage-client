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
    let results = await $user.register(account)
    if (results.status !== 0)
      throw new Error(results.message)

    account.update(results.data[ account.userid ])

    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("results: " + JSON.stringify(account))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
  }

  console.log("=== user login")
  try {
    let results = await $user.login(user)
    if (results.status !== 0)
      throw new Error(results.message)

    $user.password = user.password  // since there is no auth handler in test mode
    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("results: " + JSON.stringify(results.data[user.userid]))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()
  }
  catch (err) {
    console.warn(err.message)
    return
  }

  console.log("=== user store")
  try {
    $user.profile.displayName = "Tester the Testy"
    let results = await $user.store()
    if (results.status !== 0)
      throw new Error(results.message)

    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("results: " + JSON.stringify(results.data[$user.userid]))
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
    let results = await $user.logout()
    if (results.status !== 0)
      throw new Error(results.message)

    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("results: " + JSON.stringify(results.message))
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
    let results = await $user.login({ userid: "admin", password: "admin" })
    if (results.status !== 0)
      throw new Error(results.message)
    $user.password = "admin"

    let accounts = new Accounts()
    results = await accounts.dull(user)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log("user: " + JSON.stringify(user))
    console.log()
    console.log("results: " + JSON.stringify(results.message))
    console.log()
    console.log("$user: ", JSON.stringify($user))
    console.log()

    results = await $user.logout()
    if (results.status !== 0)
      throw new Error(results.message)
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
