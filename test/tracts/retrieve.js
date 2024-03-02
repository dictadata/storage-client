/**
 * test/tracts/retrieve.js
 */
"use strict"

import { login } from "../lib/client.js"
import Tracts from "../../storage/client/tracts.js"

console.log("=== tests: tracts retrieve")

async function test_retrieve(term) {
  console.log("retrieve " + term)
  let retCode = 0

  try {
    let tracts = new Tracts()

    // console.log('call tracts.retrieve')
    let pattern = {
      "match": {
        "type": ["alias","tract"],
        "~search": {
          "search": term,
          "fields": [ "name", "domain", "tags", "title", "type", "source", "description" ],
          "op": "AND"
        }
      }
    }

    let results = await tracts.retrieve(pattern)
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

  if (await test_retrieve("foo")) return
  //if (await test_retrieve("census.gov")) return

})()
