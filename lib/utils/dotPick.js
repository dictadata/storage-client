// storage/utils/dotPick
"use strict";

/**
 * utility function finding a object property using dot notation
 * @param {Object} dname property name, optionally using dot notation
 * @param {String} obj object to pick from
 */
export default function dotPick(dname, obj) {
  let props = dname.split('.')

  let prop
  try {
    prop = props.reduce((tobj, pname) => tobj[ pname ], obj)
  }
  catch (err) {
    console.warn(err.message)
  }

  return prop
}
