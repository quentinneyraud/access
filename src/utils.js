import fs from 'fs'

export const mergeExistingKey = (source, overrride) => {
  source = Object.assign({}, source)

  Object.keys(source).forEach(key => {
    if (overrride[key]) {
      source[key] = overrride[key]
    }
  })

  return source
}

export const fileExists = (path) => {
  return fs.existsSync(path)
}
