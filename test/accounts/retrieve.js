/**
 * test/user/dicta_user.js
 */
"use strict"

import { login }from "../lib/client.js"
import Accounts from "../../lib/accounts.js"

/**
 * User
 */
async function retrieveGuests() {

  try {
    console.log("--- accounts with role 'Guest'")
    let accounts = new Accounts()

    let results = await accounts.retrieve({ match: { roles: [ "Guest" ] } })
    console.log(results.status + " " + results.message)

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
(async () => {
  console.log("accounts retrieve tests")
  await login({ userid: "admin", password: "admin" })

  await retrieveGuests()
  console.log("--- done")
})()
