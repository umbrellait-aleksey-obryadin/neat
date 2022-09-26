#!/usr/bin/env node

const { spawn } = require('child_process')
const { Command } = require('commander')
const path = require('path')
const program = new Command()
const fs = require('fs-extra')
const os = require('os')

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

const updateEnvFile = (path, mapping) => {
  const env = fs.readFileSync(path, 'utf-8')
  const newEnv = env.split(os.EOL).map((line) => {
    const [key] = line.split('=')
    return key in mapping ? `${key}=${mapping[key]}` : line
  })

  fs.writeFileSync(path, newEnv.join(os.EOL))
}

program
  .command('lint')
  .description('executes eslint + prettier against codebase')
  .option('--fix', 'fix eslint and prettier errors if possible')
  .action((options) => runAndExit(bin('eslint'), ['src/**/*.{ts,tsx}', options.fix && '--fix']))

program
  .command('init')
  .description('inits new repository from neattech template')
  .requiredOption('-n, --name <name>', 'name of new repository')
  .requiredOption('-s, --sentry <dsn>', 'sentry dsn URL')
  .action(async (options) => {
    await run('cp', ['-r', fromRoot('templates/backend'), options.name])

    const envPath = path.resolve(process.cwd(), options.name, '.env')
    const envData = { SENTRY_URL: options.sentry }

    updateEnvFile(envPath, envData)

    process.chdir(path.resolve(process.cwd(), options.name))
    await run('git', 'init')
    await run('yarn')
  })

program.parse(process.argv)
