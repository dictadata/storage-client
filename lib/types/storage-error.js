// storage/types/StorageError
"use strict";

const { typeOf } = require("../utils");
const StorageResults = require("./storage-results");

module.exports = exports = class StorageError extends Error {
  constructor(status, ...params) {
    // Pass normal error arguments to parent constructor
    super(...params);

    this.name = 'StorageError';

    // StorageError result information
    this.status = status;
    if (!this.message)
      this.message = StorageResults.RESULT_CODES[this.status] || 'unknown error';
  }
}