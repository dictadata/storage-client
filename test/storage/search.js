/**
 * test/storage/search.js
 */
"use strict"

import { login } from "../lib/client.js"
import Storage from "../../storage/client/storage.js"

const urn = ":es_foo_schema"

console.log("=== tests: storage retrieve w/ search")

async function test_search(fields, value, op) {
  console.log("search " + urn)
  let retCode = 0

  try {
    let storage = new Storage()

    // console.log('call storage.retrieve')
    let pattern = {
      "match": {},  // default is match all
      "count": 100
    }
    if (fields) {
      let expression = pattern.match[ "~search" ] = {}
      expression[ "search" ] = value
      expression[ "fields" ] = fields
      if (op)
        expression["op"] = op
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

  if (await test_search()) return
  if (await test_search('Foo', 'first')) return
  if (await test_search([ 'Foo', 'Bar' ], 'row boat')) return
  if (await test_search([ 'Foo', 'Bar' ], 'row boat', 'AND')) return
})()
