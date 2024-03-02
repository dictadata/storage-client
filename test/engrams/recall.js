/**
 * test/engrams/recall.js
 */
"use strict"

import { login } from "../lib/client.js"
import Engrams from "../../storage/client/engrams.js"

console.log("=== tests: engrams recall")

async function test_recall(urn) {
  console.log("recall " + urn)
  let retCode = 0

  try {
    let engrams = new Engrams()

    let results = await engrams.recall(urn)
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

  if (await test_recall("foo:foo_schema")) return
  //if (await test_recall(":es_foo_schema", 'seventh')) return
  //if (await test_recall(":es_foo_schema", 'twenty')) return

})()
