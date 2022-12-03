// storage/utils/hasOwnProperty
"use strict";

/**
 * utility function for Object.hasOwnProperty
 * @param {Object} obj
 * @param {String} propertyName
 */
export default function hasOwnProperty(obj, propertyName) {
  if (!obj || !propertyName) return false;
  return Object.prototype.hasOwnProperty.call(obj, propertyName);
}
