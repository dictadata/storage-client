/**
 * test/accounts/login.js
 */
"use strict"

import Accounts from "../../lib/accounts.js"
import $user from "../../lib/user.js"

console.log("=== tests: accounts login")

async function test_1() {
  // login into api.dictadata.org as dicta user
  let accounts = new Accounts({
    baseURL: "http://localhost:8089"
  })

  console.log($user.userid)

  let result = await accounts.login({ userid: "dicta", password: "data" })
  console.log("login: " + result)

  console.log($user.userid)
}

(async () => {
  if (await test_1()) return
})()
