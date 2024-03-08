// storage/types/StorageError
"use strict";

import StorageResults from "./storage-results";

export default class StorageError extends Error {
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
