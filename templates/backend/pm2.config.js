// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const parentDirectoryName = path.basename(__dirname)

module.exports = {
  apps: [
    {
      name: `${parentDirectoryName}-sandbox-backend`,
      script: 'npm',
      args: 'run start',
    },
  ],
}
