'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const rules = [require('./acessibility/alt').default];

const getRulesByPreset = exports.getRulesByPreset = preset => {
  return rules.filter(rule => {
    return rule.meta.presets.indexOf(preset) > -1;
  });
};