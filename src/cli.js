import program from 'commander'
import debug from 'debug'
import { version } from '../package.json'
import path from 'path'

const d = debug('access:Cli')

const list = (val, memo) => memo.concat(val.split(','))

export default {
    /**
     * Set CLI infos and parse command
     */
    execute () {
      d('execute')
        program
            .version(version, '-v, --version')
            .usage('[options] <address>')
            .option('-c, --config <config_path>', 'set config file path', false)
            .option('-o, --output-file [output_path]', 'set output file path', false)
            .option('-i, --ignore-path <ignore_path>', 'ignore path', list, [])
            .option('-ip, --ignore-pattern <ignore_pattern>', 'ignore pattern', list, [])
            .option('-q, --quiet', 'report errors only', false)
            .option('-d, --debug', 'debug', false)
            .parse(process.argv)
    },

    /**
     * Return all CLI arguments validated
     * @returns {object}
     */
    getArguments () {
        this.arguments = program.opts()
        this.arguments.address = program.args[0]
        this.validateAndFormatArguments()
        return this.arguments
    },

    /**
     * Validate CLI arguments
     */
    validateAndFormatArguments () {
      // quiet
      if (!this.arguments.quiet) this.arguments.quiet = false

      // output file
      if (this.arguments.outputFile) {
        let outputFilePath = null
        if (this.arguments.outputFile === true) {
          outputFilePath = 'access_report.log'
        } else if (path.extname(this.arguments.outputFile) !== '.log') {
          outputFilePath = this.arguments.outputFile + '.log'
        } else {
          outputFilePath = this.arguments.outputFile
        }
        this.arguments.outputFile = path.resolve(outputFilePath)
      }

      // address
      if (this.arguments.address && !this.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
        console.warn(`L'adresse ${this.arguments.address} n'est pas une adresse valide`)
        process.exit(0)
      }
    }
}
