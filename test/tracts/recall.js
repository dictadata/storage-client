/**
 * test/tracts/recall.js
 */
"use strict"

import { login } from "../lib/client.js"
import Tracts from "../../lib/tracts.js"

console.log("=== tests: tracts recall")

async function test_recall(urn) {
  console.log("recall " + urn)
  let retCode = 0

  try {
    let tracts = new Tracts()

    let results = await tracts.recall(urn)
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

  if (await test_recall("foo:foo_transfer")) return
  //if (await test_recall(":es_foo_transfer", 'seventh')) return
  //if (await test_recall(":es_foo_transfer", 'twenty')) return

})()
