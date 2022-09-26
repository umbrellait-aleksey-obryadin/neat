const webpack = require('webpack')
const WDS = require('webpack-dev-server')

const configs = require('./config/dev')

const wp = webpack(configs)

for (let i = 0; i < configs.length; i++) {
  const config = configs[i]
  const compiler = wp.compilers[i]
  const server = new WDS(compiler, config.devServer)

  const port = config.devServer.port
  server.listen(port, '0.0.0.0', console.log)
}
