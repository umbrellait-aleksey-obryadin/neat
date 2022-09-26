#!/usr/bin/env node

const { spawn } = require('child_process')
const { Command } = require('commander')
const path = require('path')
const program = new Command()

program.storeOptionsAsProperties(false).passCommandToAction(false).version('0.0.0')

const fromRoot = (relative) => path.resolve(__dirname, '..', relative)
const runAndExit = (...args) => run(...args).then((code) => process.exit(code))
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

program
  .command('lint')
  .description('executes eslint + prettier against codebase')
  .option('--fix', 'fix eslint and prettier errors if possible')
  .action((options) => runAndExit(bin('eslint'), ['src/**/*.{ts,tsx}', options.fix && '--fix']))

program
  .command('lint-staged')
  .description('executes eslint + prettier against codebase')
  .option('--fix', 'fix eslint and prettier errors if possible')
  .action((options) => runAndExit(bin('lint-staged')))

program
  .command('init')
  .description('inits new repository from neattech template')
  .requiredOption('-n, --name <name>', 'name of new repository')
  .action(async (options) => {
    await run('npx', ['react-native', 'init', options.name, '--template', 'file://~' + fromRoot('templates/mobile')])
    await run('git', 'init')
  })

program.parse(process.argv)
