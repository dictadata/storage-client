/**
 * test/lib/client.js
 */
"use strict"

import StorageAPI from "../../storage/client/storage-api.js"
import $user from '../../storage/client/user.js'

StorageAPI.baseURL = "http://dev.dictadata.net"

export async function login( user = { userid: "user", password: "user" }) {
  try {
    //console.log("--- user login")
    let results = await $user.login(user)
    //console.log(results.message)
    return results
  }
  catch (err) {
    console.warn(err.message)
    return err
  }
}
