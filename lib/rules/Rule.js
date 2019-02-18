'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ACCEPTED_LEVELS = ['none', 'warning', 'error'];

class Rule {
  constructor() {
    this.level = 'error';
  }

  set level(value) {
    if (ACCEPTED_LEVELS.indexOf(this.level) === -1) {
      console.warn(`${value} is not an accepted rule level`);
    }
  }

  execute() {
    return _asyncToGenerator(function* () {})();
  }
}
exports.default = Rule;