/**
 * test/storage/search.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictaDataAPI.js"
import Storage from "../../lib/storage.js"
import $user from "../../lib/user.js"

const smt_urn = ":es_foo_schema"

console.log("=== tests: storage retrieve w/ search")

async function test_search(fields, value, op) {
  console.log("retrieveFoo")
  let retCode = 0

  try {
    let storage = new Storage({
      baseURL: "http://dev.dictadata.org:8089"
    })

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
      

    let constructs = await storage.retrieve(smt_urn, pattern)
    console.log(JSON.stringify(constructs))
  }
  catch (err) {
    console.log(err)
    retCode = 1
  }

  return retCode
}

(async () => {
  if (await test_search()) return
  if (await test_search('Foo', 'first')) return
  if (await test_search([ 'Foo', 'Bar' ], 'row boat')) return
  if (await test_search([ 'Foo', 'Bar' ], 'row boat', 'AND')) return
})()
