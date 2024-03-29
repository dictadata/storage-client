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
    console.log(results);
  }
  catch (err) {
    console.warn(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  await login()

  if (await test_transfer("dicta:geography_latlng", "00", {
    "lng": -91.4613761135469,
    "lat": 41.65835958166854
  })) return 1

  if (await test_transfer("dicta:census_population", "00", { LSAD: "00", STATEFP: "19" })) return 1

  if (await test_transfer("dicta:voter_registration", "00", {LSAD: "00", STATEFP: "19"})) return 1

})()
