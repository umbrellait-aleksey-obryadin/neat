/* eslint-disable */
const merge = require('webpack-merge')
const { getEntries, modifyWebpackConfigWithCustom } = require('../../utils')
const getBaseConfig = require('./base')

/**
 *
 * @param {import("../types").Entry} entry
 */
const createProdConfig = (entry) => {
  const baseConfig = getBaseConfig(entry)
  const prodConfig = merge(baseConfig, {
    mode: 'production',

    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
    },

    stats: {
      // transpileOnly mode can't handle properly type re-exports, so suppress it
      warningsFilter: /export .* was not found in/,
    },
  })

  return modifyWebpackConfigWithCustom(prodConfig)
}

const entries = getEntries()

module.exports = entries.map(createProdConfig)
