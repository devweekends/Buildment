'use strict';

/**
 * Theia (@theia/cli / plugin-ext*) still does require('decompress').
 * The maintained security fork is ESM-only, so this thin CJS wrapper preserves
 * the historical callable default export while resolving to the patched library.
 */
function decompress(...args) {
  return import('@xhmikosr/decompress').then((mod) => mod.default(...args));
}

module.exports = decompress;
