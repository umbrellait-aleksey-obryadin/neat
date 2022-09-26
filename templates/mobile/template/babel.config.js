const path = require('path')
const alias = { '~': path.resolve(__dirname, 'src') }

const baseConfig = require("@neat/frontend/babel.config");

module.exports = {
  ...baseConfig,
  plugins: [
    ['module-resolver', { alias }],
  ],
}
