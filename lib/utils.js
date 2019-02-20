'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileExists = exports.mergeExistingKey = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mergeExistingKey = exports.mergeExistingKey = (source, overrride) => {
  source = Object.assign({}, source);

  Object.keys(source).forEach(key => {
    if (overrride[key]) {
      source[key] = overrride[key];
    }
  });

  return source;
};

const fileExists = exports.fileExists = path => {
  return _fs2.default.existsSync(path);
};