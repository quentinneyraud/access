import { fileExists } from './utils'
import defaultConfig from './config.default'
import path from 'path'

const CONFIG_FILES = [
  ".access.js",
  ".access.json",
  "package.json"
]

/**
 *  Load config files
 */

const loadJsConfigFile = (path) => {
  return require(path)
}

const loadJsonConfigFile = (path) => {

}

const loadPackageJsonConfigFile = () => {

}

/**
 * Validate config
 */

const validateAddress = (address) => {
  if (!address)

  if (addrese && !this.arguments.address.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/)) {
    console.warn(`L'adresse ${this.arguments.address} n'est pas une adresse valide`)
    process.exit(0)
  }
}

export default class Config {
  constructor() {
    this.baseConfig = defaultConfig
  }

  mergeFileConfig (filePath = null) {
    let fileConfig = null

    if (filePath && !fileExists(filePath)) {
      console.warn(`${filePath} n'existe pas`);
      process.exit(1)
    }

    if (!filePath) {
      filePath = CONFIG_FILES.find(possibleConfigFilePath => {
        return fileExists(possibleConfigFilePath)
      })
    }

    if (filePath) {
      switch (path.extname(filePath)) {
        case '.js':
          fileConfig = loadJsConfigFile(filePath)
          break;
        case '.json':
          let jsonConfig = loadJsonConfigFile(filePath)
          if (path.basename(filePath) === 'package') {
            fileConfig = jsonConfig.access
          } else {
            fileConfig = jsonConfig
          }
          break;
        default:
          console.warn(`Les fichiers de config avec l'extension ${path.extname(filePath)} ne sont pas acceptés`)
          process.exit(1)
          break;
      }
    }

    this.baseConfig = Object.assign({}, this.baseConfig, fileConfig)
  }

  mergeUserConfig (userConfig) {
    this.baseConfig = Object.assign({}, this.baseConfig, userConfig)
  }

  validate () {

  }
}
