// storage/utils/dot
"use strict";

/**
 * utility function finding a object property using dot notation
 * @param {String} dotname property name using dot notation
 * @param {Object} construct object to pick
 */
export default {
  get: (dotname, construct) => {
    let props = dotname.split('.');

    let prop;
    try {
      prop = props.reduce((obj, name) => obj[ name ], construct);
    }
    catch (err) {
      console.warn(err.message);
    }

    return prop;
  },

  set: (dotname, construct, value) => {
    let props = dotname.split('.');
    let vname = props.pop();

    let prop = construct;
    try {
      for (let name of props) {
        if (!Object.prototype.hasOwnProperty.call(prop, name))
          prop[ name ] = {};
        prop = prop[ name ];
      }
    }
    catch (err) {
      console.warn(err.message);
    }

    if (typeof prop !== "object")
      return false;

    prop[ vname ] = value;
    return true;
  }
};
