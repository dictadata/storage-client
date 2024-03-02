/**
 * client/utils/numberValue.js
 */

export default function numberValue(value, ftype) {
  if (typeof value === "string") {
    if (ftype === "integer")
      value = parseInt(value)
    else if (ftype === "number")
      value = parseFloat(value)
  }
  return value
}
