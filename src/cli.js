import program from 'commander'
import { version } from '../package.json'
import fs from 'fs'
import path from 'path'

const DEFAULT_CONFIG_FILE_PATH = './.accessrc.json'

const list = (val, memo) => memo.concat(val.split(','))

/**
 * Class Cli
 */
export default class Cli {
    /**
     * Set CLI infos and parse command
     */
    execute () {
        program
            .version(version, '-v, --version')
            .usage('[options] <address>')
            .option('-c, --config <config_path>', 'Set config file path', DEFAULT_CONFIG_FILE_PATH)
            .option('-o, --output-file [output_path]', 'Set output file path', false)
            .option('-i, --ignore-path <ignore_path>', 'Ignore path', list, [])
            .option('-ip, --ignore-pattern <ignore_pattern>', 'Ignore pattern', list, [])
            .option('-q, --quiet', 'Report errors only', false)
            .parse(process.argv)
    }

    /**
     * Return all CLI arguments validated
     * @returns {object}
     */
    getArguments () {
        this.arguments = program.opts()
        this.arguments.address = program.args[0]
        this.validateAndFormatArguments()
        return this.arguments
    }

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

      // config file
      this.arguments.config = path.resolve(this.arguments.config)
      if (!fs.existsSync(this.arguments.config)) {
        console.warn(`Le fichier de config ${this.arguments.config}`)
        process.exit(0)
      }

      // address
      if (!this.arguments.address) {
        console.warn(`Aucune adresse fournie`)
        process.exit(0)
      } else if (!this.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
        console.warn(`L'adresse ${this.arguments.address} n'est pas une adresse valide`)
        process.exit(0)
      }
    }
}
