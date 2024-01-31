/**
 * test/transfer/transfer.js
 */
"use strict"

import { login } from "../lib/client.js"
import Transfer from "../../lib/transfer.js"

console.log("=== tests: transfer")

async function test_transfer(tract) {
  console.log("transfer " + tract)
  let retCode = 0

  try {
    let transfer = new Transfer()

    // console.log('call transfer.transfer')
    let results = await transfer.transfer(tract)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log(JSON.stringify(results.data))
  }
  catch (err) {
    console.warn(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  await login()

  if (await test_transfer("foo:foo_transfer")) return

})()
