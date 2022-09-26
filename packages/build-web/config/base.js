/* eslint-disable */
const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs-extra')
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { cwd, getNeatConfig } = require('../../utils')
const { parsed: env } = dotenv.config()

const marked = require('marked')
const highlight = require('highlight.js')

/**
 *
 * @param {import("../../utils/types").Entry} entry
 */
module.exports = (entry) => {
  const neatConfig = getNeatConfig()

  return merge(
    {},
    {
      entry: cwd(entry.path),
      output: {
        path: cwd(`dist/${entry.name}`),
        publicPath: env.PUBLIC_URL || '/',
      },

      module: {
        rules: [
          {
            test: /\.md$/,
            use: [
              { loader: 'html-loader' },

              {
                loader: 'markdown-loader',
                options: {
                  renderer: new marked.Renderer(),
                  highlight: function (code, lang) {
                    const html = highlight.highlight(lang, code).value
                    return `<span class="hljs">${html}</span>`
                  },
                },
              },
            ],
          },
          {
            loader: 'ts-loader',
            test: /\.tsx?$/,
            exclude: /node_modules/,
            options: {
              transpileOnly: true,
            },
          },
          {
            test: /\.s?css$/,
            exclude: /\.module\.scss$/,
            use: getCssLoaders(false),
          },
          {
            test: /\.module\.scss$/,
            use: getCssLoaders(true),
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
          {
            loader: 'file-loader',
            test: /\.(eot|otf|svg|ttf|woff|woff2|png|pdf|ico|gif|jpg)$/,
          },
          {
            use: [path.resolve(__dirname, '../../../tools/i18n/loader.js')],
            test: /\.i18n\.json$/,
          },
        ],
      },

      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          templateParameters: { projectName: neatConfig.name },
          template: cwd(entry.template),
          favicon: cwd(entry.favicon),
        }),
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          failOnError: true,
        }),
        new webpack.EnvironmentPlugin({
          ...env,
          NODE_ENV: 'development',
          PUBLIC_URL: '',
        }),
        env.ANALYZE &&
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
          }),
      ].filter(Boolean),

      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
        alias: { '~': cwd('src') },
      },
    },
  )
}

/**
 * Get CSS Loaders
 */
function getCssLoaders(useModules) {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: useModules,
          localIdentName: env.NODE_ENV === 'production' ? '[hash:base64]' : '[name]__[local]',
        },
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('autoprefixer')(),
          require('postcss-pxtorem')({
            rootValue: 16,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: ['html'],
          }),
        ],
      },
    },
    'sass-loader',
  ]
}
