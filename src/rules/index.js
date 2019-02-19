 const rules = [
  require('./acessibility/alt').default
]

export const getRulesByPreset = (preset) => {
  return rules.filter(rule => {
    return rule.meta.presets.indexOf(preset) > -1
  })
}
