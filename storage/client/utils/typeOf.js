// storage/utils/typeOf
"use strict";

/**
 * typeOf returns base type of objects like "string", "array", "date", "regexp"
 * or the object's constructor name
 * @param {any} obj the object to check
 * @param {Boolean} cname return for constructor.name for Objects
 */
export default function typeOf(obj, name = false) {

  // "[object BaseType]"
  let baseType = Object.prototype.toString.call(obj).slice(8, -1);

  if (name && baseType !== "Null") {
    let cname = obj?.constructor.name;
    return cname;
  }
  else {
    return baseType.toLowerCase();
  }

}
