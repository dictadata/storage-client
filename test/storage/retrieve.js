/**
 * test/storage/retrieve.js
 */
"use strict"

import { login } from "../lib/client.js"
import Storage from "../../lib/storage.js"

console.log("=== tests: storage retrieve")

async function test_retrieve(urn, field, value, op) {
  console.log("retrieve " + urn)
  let retCode = 0

  try {
    let storage = new Storage()

    // console.log('call storage.retrieve')
    let pattern = {
      "match": {},  // default is match all
      "count": 10
    }
    if (op) {
      let expression = pattern.match[ field ] = {}
      expression[op] = value
    }
    else if (value) {
      pattern.match[ field ] = value
    }
    else if (field) {
      throw new Error("What do you want me to do with this?");
    }

    let results = await storage.retrieve(urn, pattern)
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

  if (await test_retrieve(":es_foo_schema")) return
  if (await test_retrieve(":es_foo_schema", 'Foo', 'first')) return
  if (await test_retrieve(":es_foo_schema", 'Bar', 'row*', "wc")) return
})()
