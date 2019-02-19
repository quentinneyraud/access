"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const mergeExistingKey = exports.mergeExistingKey = (source, overrride) => {
  source = Object.assign({}, source);

  Object.keys(source).forEach(key => {
    if (overrride[key]) {
      source[key] = overrride[key];
    }
  });

  return source;
};