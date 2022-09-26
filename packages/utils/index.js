const path = require('path')
const fs = require('fs-extra')

/**
 *
 * @param {string} relativePath
 */
const cwd = (relativePath) => path.resolve(process.cwd(), relativePath)

/**
 *
 * @returns {import("./types").NeatConfig}
 */
const getNeatConfig = () => {
  return fs.readJsonSync(cwd('.neatrc'))
}

/**
 *
 * @returns {import("./types").Entry[]}
 */
const getEntries = () => {
  const neatConfig = getNeatConfig()
  /**
   * @type import("./types").Entry[]
   */
  const entries = []
  for (const name in neatConfig.entries) {
    const neatEntry = neatConfig.entries[name]
    entries.push({
      ...neatEntry,
      name,
      favicon: neatEntry.favicon || './public/favicon.ico',
      template: neatEntry.template || './public/index.ejs',
    })
  }

  return entries
}

const modifyWebpackConfigWithCustom = (config) => {
  const fs = require('fs')
  const pathToConfigModifier = cwd('./webpack.neat.js')

  if (fs.existsSync(pathToConfigModifier)) {
    const modifyConfig = require(pathToConfigModifier)
    return modifyConfig(config)
  }

  return config
}

module.exports = { cwd, getNeatConfig, getEntries, modifyWebpackConfigWithCustom }
