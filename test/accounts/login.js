/**
 * test/accounts/login.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictaDataAPI.js"
import Accounts from "../../lib/accounts.js"
import $user from "../../lib/user.js"

console.log("=== tests: accounts login")

async function test_1() {
  try {
    // login into api.dictadata.org as dicta user
    let accounts = new Accounts({
      baseURL: "http://dev.dictadata.org:8089"
    })

    console.log($user.userid)

    let result = await accounts.login({ userid: "dicta", password: "data" })
    console.log("login: " + result)

    console.log($user.userid)
  }
  catch (err) {
    console.warn(err.message);
  }
}

async function test_2() {
  // login into api.dictadata.org as dicta user
  DictaDataAPI.baseURL = "http://localhost:8089"
  DictaDataAPI.$user.userid = "dicta"
  DictaDataAPI.$user.password = "data"

  console.log($user.userid)

  // login into api.dictadata.org as default user (dicta)
  let accounts = new Accounts()
  // console.log("login: ...")
  accounts
    .login()
    .then((result) => {
      console.log("login: " + result)
    })
    .catch((error) => {
      console.warn("login: " + error)
    })

  console.log($user.userid)
}

(async () => {
  if (await test_1()) return
  if (await test_2()) return
})()
