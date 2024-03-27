/**
 * test/etl/transfer.js
 */
"use strict"

import { login } from "../lib/client.js"
import ETL from "../../storage/client/etl.js"

//console.log("=== tests: ETL transfer")

async function test_transfer(tract, fiber, params) {
  //console.log("transfer: " + tract)
  let retCode = 0

  try {
    let etl = new ETL()

    //console.log('call etl.perform')
    let results = await etl.perform(tract, fiber, params)
    if (results.status !== 200)
      throw new Error(results.message)

    //console.log("results.data: " + results.data.length);
  }
  catch (err) {
    console.warn(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  await login()

  if (await test_transfer("foo:foo_transfer", "mysql-json", {})) return

  if (await test_transfer("dicta:geography", "boundaries", {
    "tag": "boundary",
    "lng": -91.4613761135469,
    "lat": 41.65835958166854
  })) return

  if (await test_transfer("dicta:population", "00", { STATEFP: "19" })) return

  if (await test_transfer("dicta:voter_registration", "00", {LSAD: "00", STATEFP: "19"})) return

})()
