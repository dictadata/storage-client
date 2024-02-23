/**
 * test/lib/client.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import $user from '../../lib/user.js'

DictaDataAPI.baseURL = "http://dev.dictadata.net"

export async function login( user = { userid: "user", password: "user" }) {
  try {
    console.log("--- user login")
    let results = await $user.login(user)
    console.log(results.message)
    return results
  }
  catch (err) {
    console.warn(err.message)
    return err
  }
}
