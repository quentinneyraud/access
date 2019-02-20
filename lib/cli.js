'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _package = require('../package.json');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const d = (0, _debug2.default)('access:Cli');

const list = (val, memo) => memo.concat(val.split(','));

exports.default = {
  /**
   * Set CLI infos and parse command
   */
  execute() {
    d('execute');
    _commander2.default.version(_package.version, '-v, --version').usage('[options] <address>').option('-c, --config <config_path>', 'set config file path', false).option('-o, --output-file [output_path]', 'set output file path', false).option('-i, --ignore-path <ignore_path>', 'ignore path', list, []).option('-ip, --ignore-pattern <ignore_pattern>', 'ignore pattern', list, []).option('-q, --quiet', 'report errors only', false).option('-d, --debug', 'debug', false).parse(process.argv);
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

    // address
    if (this.arguments.address && !this.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
      console.warn(`L'adresse ${this.arguments.address} n'est pas une adresse valide`);
      process.exit(0);
    }
  }
};