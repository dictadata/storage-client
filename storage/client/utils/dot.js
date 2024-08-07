// storage/utils/dot
"use strict";

import typeOf from "./typeOf.js";

export default {

  /**
   * find an object property using dot notation
   * @param {Object} construct object to pick
   * @param {String} dotname property name using dot notation
   * @returns the object property
   */
  has: (construct, dotname) => {
    let props = dotname.split('.');

    let prop;
    try {
      prop = props.reduce((prop, name) => {
        if (typeof prop !== "object")
          return prop;
        let nv = name.split('=');
        if (nv.length === 2)
          return prop.find((value) => value[ nv[ 0 ] ] === nv[ 1 ]);
        else
          return prop[ name ];
      }, construct);
    }
    catch (err) {
      console.warn(err.message);
    }

    return prop !== undefined;
  },

  /**
   * find an object property using dot notation
   * @param {String} dotname property name using dot notation
   * @param {Object} construct object to pick
   * @returns the object property
   */
  get: (construct, dotname) => {
    let props = dotname.split('.');

    let prop;
    try {
      prop = props.reduce((prop, name) => {
        if (typeof prop !== "object")
          return prop;
        let nv = name.split('=');
        if (nv.length === 2)
          return prop.find((value) => value[ nv[ 0 ] ] === nv[ 1 ]);
        else
          return prop[ name ];
      }, construct);
    }
    catch (err) {
      console.warn(err.message);
    }

    return prop;
  },

  /**
   * set an object property to value using dot notation
   * @param {String} dotname property name using dot notation
   * @param {Object} construct object to pick
   * @param {*} value new value for property
   * @returns true if successful, false if invalid dot notation for construct
   */
  set: (construct, dotname, value) => {
    let names = dotname.split(".");
    let vname = names.pop();

    let prop = construct;
    try {
      for (let name of names) {
        let nv = name.split('=');
        if (nv.length === 2)
          prop = prop.find((value) => value[ nv[ 0 ] ] === nv[ 1 ]);
        else {
          if (!Object.hasOwn(prop, name))
            prop[ name ] = {};
          prop = prop[ name ];
        }
      }
    }
    catch (err) {
      console.warn(err.message);
    }

    if (typeOf(prop) === "array")
      prop.push(value);
    else if (typeOf(prop) === "object")
      prop[ vname ] = value;
    else
      return false;

    return true;
  }
};
