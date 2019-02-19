'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_CONFIG_FILE_PATH = './.accessrc.json';

const list = (val, memo) => memo.concat(val.split(','));

exports.default = {
  /**
   * Set CLI infos and parse command
   */
  execute() {
    _commander2.default.version(_package.version, '-v, --version').usage('[options] <address>').option('-c, --config <config_path>', 'Set config file path', DEFAULT_CONFIG_FILE_PATH).option('-o, --output-file [output_path]', 'Set output file path', false).option('-i, --ignore-path <ignore_path>', 'Ignore path', list, []).option('-ip, --ignore-pattern <ignore_pattern>', 'Ignore pattern', list, []).option('-q, --quiet', 'Report errors only', false).parse(process.argv);
  },

  /**
   * Return all CLI arguments validated
   * @returns {object}
   */
  getArguments() {
    this.arguments = _commander2.default.opts();
    this.arguments.address = _commander2.default.args[0];
    this.validateAndFormatArguments();
    return this.arguments;
  },

  /**
   * Validate CLI arguments
   */
  validateAndFormatArguments() {
    // quiet
    if (!this.arguments.quiet) this.arguments.quiet = false;

    // output file
    if (this.arguments.outputFile) {
      let outputFilePath = null;
      if (this.arguments.outputFile === true) {
        outputFilePath = 'access_report.log';
      } else if (_path2.default.extname(this.arguments.outputFile) !== '.log') {
        outputFilePath = this.arguments.outputFile + '.log';
      } else {
        outputFilePath = this.arguments.outputFile;
      }
      this.arguments.outputFile = _path2.default.resolve(outputFilePath);
    }

    // config file
    this.arguments.config = _path2.default.resolve(this.arguments.config);
    if (!_fs2.default.existsSync(this.arguments.config)) {
      console.warn(`Le fichier de config ${this.arguments.config}`);
      process.exit(0);
    }

    // address
    if (this.arguments.address && !this.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
      console.warn(`L'adresse ${this.arguments.address} n'est pas une adresse valide`);
      process.exit(0);
    }
  }
};