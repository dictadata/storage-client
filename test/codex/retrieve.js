/**
 * test/codex/retrieve.js
 */
"use strict"

import { login } from "../lib/client.js"
import Codex from "../../lib/codex.js"

console.log("=== tests: codex retrieve")

async function test_retrieve(term) {
  console.log("retrieve " + term)
  let retCode = 0

  try {
    let codex = new Codex()

    // console.log('call codex.retrieve')
    let pattern = {
      "match": {
        "type": ["alias","engram"],
        "~search": {
          "search": term,
          "fields": [ "name", "domain", "tags", "title", "type", "source", "description" ],
          "op": "AND"
        }
      }
    }

    let results = await codex.retrieve(pattern)
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

  if (await test_retrieve("foo")) return
  if (await test_retrieve("census.gov")) return

})()
