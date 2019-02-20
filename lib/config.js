'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _config = require('./config.default');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CONFIG_FILES = [".access.js", ".access.json", "package.json"];

/**
 *  Load config files
 */

const loadJsConfigFile = path => {
  return require(path);
};

const loadJsonConfigFile = path => {};

const loadPackageJsonConfigFile = () => {};

/**
 * Validate config
 */

const validateAddress = address => {
  if (!address) if (addrese && !undefined.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
    console.warn(`L'adresse ${undefined.arguments.address} n'est pas une adresse valide`);
    process.exit(0);
  }
};

class Config {
  constructor() {
    this.baseConfig = _config2.default;
  }

  mergeFileConfig(filePath = null) {
    let fileConfig = null;

    if (filePath && !(0, _utils.fileExists)(filePath)) {
      console.warn(`${filePath} n'existe pas`);
      process.exit(1);
    }

    if (!filePath) {
      filePath = CONFIG_FILES.find(possibleConfigFilePath => {
        return (0, _utils.fileExists)(possibleConfigFilePath);
      });
    }

    if (filePath) {
      switch (_path2.default.extname(filePath)) {
        case '.js':
          fileConfig = loadJsConfigFile(filePath);
          break;
        case '.json':
          let jsonConfig = loadJsonConfigFile(filePath);
          if (_path2.default.basename(filePath) === 'package') {
            fileConfig = jsonConfig.access;
          } else {
            fileConfig = jsonConfig;
          }
          break;
        default:
          console.warn(`Les fichiers de config avec l'extension ${_path2.default.extname(filePath)} ne sont pas acceptés`);
          process.exit(1);
          break;
      }
    }

    this.baseConfig = Object.assign({}, this.baseConfig, fileConfig);
  }

  mergeUserConfig(userConfig) {
    this.baseConfig = Object.assign({}, this.baseConfig, userConfig);
  }

  validate() {}
}
exports.default = Config;