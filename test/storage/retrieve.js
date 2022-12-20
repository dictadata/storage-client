/**
 * test/storage/retrieve.js
 */
"use strict"

import DictaDataAPI from "../../lib/dictadata-api.js"
import Storage from "../../lib/storage.js"
import $user from "../../lib/user.js"

console.log("=== tests: storage retrieve")

async function test_retrieve(smt_urn, field, value, op) {
  console.log("retrieveFoo")
  let retCode = 0

  try {
    let storage = new Storage({
      baseURL: "http://dev.dictadata.org"
    })

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
  if (await test_retrieve(":es_foo_schema")) return
  if (await test_retrieve(":es_foo_schema", 'Foo', 'first')) return
  if (await test_retrieve(":es_foo_schema", 'Bar', 'row*', "wc")) return
})()
