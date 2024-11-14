#!/usr/bin/env node
const { execSync } = require('child_process'); // Import execSync from child_process
const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('init [path]', 'Init a Codemos course in an existing folder', (yargs) => { 
    yargs.positional('path', {
      describe: 'Folder path',
      type: 'string',
      default: '.'
    })
  }, (yargs) => {
    const initCodemos = require('./commands/init');
    initCodemos(yargs.path);
  })
  .command('remove', 'Remove Codemos course in current folder', (yargs) => {
    const removeCodemos = require('./commands/remove');
    removeCodemos();
  })
  .command('dev', 'Run Codemos in dev mode', () => {
    try {
      execSync('codemosdk dev', { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to start in dev mode:', error.message);
    }
  })
  .command('build', 'Build Codemos course', () => {
    try {
      execSync('codemosdk build', { stdio: 'inherit' });
    } catch (error) {
      console.error('Failed to build course:', error.message);
    }
  })
  .example('$0 init', 'Init a Codemos course in the current folder')
  .help('h')
  .alias('h', 'help')
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .argv
