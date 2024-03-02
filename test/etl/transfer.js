/**
 * test/etl/transfer.js
 */
"use strict"

import { login } from "../lib/client.js"
import ETL from "../../storage/client/etl.js"

console.log("=== tests: ETL transfer")

async function test_transfer(tract, params) {
  console.log("transfer " + tract)
  let retCode = 0

  try {
    let etl = new ETL()

    // console.log('call etl.perform')
    let results = await etl.perform(tract, params)
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

  if (await test_transfer("foo:foo_transfer", {})) return

})()
