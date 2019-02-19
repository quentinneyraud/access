export const mergeExistingKey = (source, overrride) => {
  source = Object.assign({}, source)

  Object.keys(source).forEach(key => {
    if (overrride[key]) {
      source[key] = overrride[key]
    }
  })

  return source
}
