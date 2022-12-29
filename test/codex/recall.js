/**
 * test/codex/recall.js
 */
"use strict"

import { login } from "../lib/client.js"
import Codex from "../../lib/codex.js"

console.log("=== tests: codex recall")

async function test_recall(smt_urn) {
  console.log("recall " + smt_urn)
  let retCode = 0

  try {
    let codex = new Codex()

    let results = await codex.recall(smt_urn)
    if (results.status !== 0)
      throw new Error(results.message)

    console.log(JSON.stringify(results.data))
  }
  catch (err) {
    console.log(err)
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
