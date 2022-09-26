#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

program
  .version('0.0.0')
  .command('frontend [command]', 'run frontend commands')
  .command('mobile [command]', 'run mobile commands')
  .command('backend [command]', 'run backend commands')

program.parse(process.argv)
