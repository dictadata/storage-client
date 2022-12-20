/**
 * test/user/dicta_user.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Accounts from "../../lib/accounts.js"
import Account from "../../lib/account.js"
import $user from '../../lib/user.js'

DictaDataAPI.baseURL = "http://dev.dictadata.org"
DictaDataAPI.$user.userid = "admin"
DictaDataAPI.$user.password = "admin"
DictaDataAPI.$user.roles = [ "User", "Admin" ]

/**
 * User
 */
async function removePublic() {

  try {
    console.log("--- user login")
    let user = { userid: "admin", password: "admin" }
    let admin = await $user.login(user)

    console.log("--- accounts retrieve Guest")

    let accounts = new Accounts()
    let results = await accounts.retrieve({ match: { roles: [ "Guest" ] } })
    console.log(results.resultCode + " " + results.resultMessage)

    for (let [ name, account ] of Object.entries(results.data)) {
      console.log(name)
    }
  }
  catch (err) {
    console.warn(err.message)
    return
  }

}

// test runner
(async function main() {
  console.log("dictadata-client tests")
  await removePublic()
  console.log("--- done")
})()
