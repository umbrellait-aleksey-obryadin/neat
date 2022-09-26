#!/usr/bin/env node

const { spawn, spawnSync } = require('child_process')
const { Command } = require('commander')
const path = require('path')
const program = new Command()
const fs = require('fs-extra')
const dotenv = require('dotenv')

function stringify(obj) {
  let result = ''

  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      const line = `${key}=${String(value)}`
      result += line + '\n'
    }
  }

  return result
}

program.storeOptionsAsProperties(false).passCommandToAction(false).version('0.0.0')

const fromRoot = (relative) => path.resolve(__dirname, '..', relative)
const bin = (command) => fromRoot(`node_modules/.bin/${command}`)

const run = (command, args, options = {}, spawner = spawn) =>
  new Promise((resolve) => {
    const proc = spawner(command, [].concat(args).filter(Boolean), {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env,
      ...options,
    })

    proc.on('exit', resolve)
  })

const runAndExit = (...args) => run(...args).then((code) => process.exit(code))

program
  .command('start')
  .description('starts webpack-dev-server')
  .action(() => require(fromRoot('packages/build-web/start')))

// program
// .command('start')
// .description('starts webpack-dev-server')
// .action(() =>
//   runAndExit(bin('webpack-dev-server'), [
//     '--config',
//     fromRoot('packages/build-web/config/dev.js'),
//     '--host 0.0.0.0',
//   ]),
// )

program
  .command('build')
  .description('creates production ready build')
  .action(() =>
    runAndExit(
      bin('webpack'),
      ['--config', fromRoot('packages/build-web/config/prod.js'), '--host 0.0.0.0'],
      {
        env: {
          ...process.env,
          NODE_ENV: 'production',
        },
      },
    ),
  )

program
  .command('print:lang')
  .description('collects all i18n messages from the codebase and prints them to stdout')
  .action(() => runAndExit('node', [fromRoot('tools/i18n/extractMessages.js')]))

program
  .command('lint')
  .description('executes eslint + prettier against codebase')
  .option('--fix', 'fix eslint and prettier errors if possible')
  .action((options) => runAndExit(bin('eslint'), ['src/**/*.{ts,tsx}', options.fix && '--fix']))

program
  .command('init')
  .description('inits new repository from neattech template')
  .requiredOption('-n, --name <name>', 'name of new repository')
  .option('-s, --sentry <dsn>', 'sentry dsn URL')
  .action(async (options) => {
    await run('cp', ['-r', fromRoot('templates/frontend'), options.name])

    const neatRCPath = path.resolve(process.cwd(), options.name, '.neatrc')

    const envPath = path.resolve(process.cwd(), options.name, '.env')
    const envContent = fs.readFileSync(envPath, 'utf-8')

    const config = dotenv.parse(envContent)
    config.SENTRY_URL = options.sentry ? options.sentry : ''

    fs.writeFileSync(envPath, stringify(config))

    const neatRCContent = fs.readJsonSync(neatRCPath)
    fs.writeJsonSync(
      neatRCPath,
      {
        ...neatRCContent,
        name: options.name,
      },
      {
        spaces: 2,
      },
    )

    process.chdir(path.resolve(process.cwd(), options.name))
    await run('git', 'init')
    await run('yarn')

    console.log(
      [
        '',
        '🚀 Neat',
        `Successfully initiated project '${options.name}'`,
        `Navigate to the project directory (\`cd ${options.name}\`)`,
        'and run `yarn start` command to start the server.',
        '',
        'Happy coding!',
        'With ❤️  from Neattech.io',
        '',
      ].join('\n'),
    )
  })

program.parse(process.argv)
