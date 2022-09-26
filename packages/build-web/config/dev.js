/* eslint-disable */
const webpack = require('webpack')
const merge = require('webpack-merge')
const getBaseConfig = require('./base')
const { getEntries, modifyWebpackConfigWithCustom } = require('../../utils')
const { getDevConfig } = require('.')

/**
 *
 * @param {import("../../utils/types").Entry} entry
 */
const createDevConfig = (entry) => {
  const baseConfig = getBaseConfig(entry)
  const devConfig = merge(baseConfig, {
    mode: 'development',

    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    devServer: {
      host: '0.0.0.0',
      port: entry.port,
      historyApiFallback: true,
      hot: true,
      inline: true,
      overlay: { errors: true },
      stats: {
        all: false,
        errors: true,
        moduleTrace: true,
        // transpileOnly mode can't handle properly type re-exports, so suppress it
        warningsFilter: /export .* was not found in/,
      },
    },
  })

  return modifyWebpackConfigWithCustom(devConfig)
}

const entries = getEntries()

module.exports = entries.map(createDevConfig)
