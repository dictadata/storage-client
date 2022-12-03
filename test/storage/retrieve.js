/**
 * test/storage/retrieve.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictaDataAPI.js"
import Storage from "../../lib/storage.js"
import $user from "../../lib/user.js"

const smt_urn = ":es_foo_schema"

console.log("=== tests: storage retrieve")

async function test_1(fields, value) {
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
      pattern.match[ "_" ] = {}
      pattern.match._[ "search" ] = value
      pattern.match._[ "fields" ] = fields
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
  if (await test_1()) return
  if (await test_1('Foo', 'first')) return
  if (await test_1([ 'Foo', 'Bar' ], 'row*')) return
})()
