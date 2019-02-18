'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('./alt');

var _alt2 = _interopRequireDefault(_alt);

var _retinaAsset = require('./retinaAsset');

var _retinaAsset2 = _interopRequireDefault(_retinaAsset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = page => ({
  alt: (0, _alt2.default)(page),
  retinaAssets: (0, _retinaAsset2.default)(page)
});