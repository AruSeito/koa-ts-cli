#!/usr/bin/env node
import { Command } from 'commander';
import { init } from '../lib/command/init';
import { getPackage } from '../lib/utils';

const program = new Command();

program.version(getPackage('version'), '-v, --version', 'display version for koa-ts-cli').usage('<command> [options]');

program
  .command('init <name>')
  .description('init a koa-ts template project')
  .action((name: string) => {
    init(name);
  });

try {
  program.parse(process.argv);
} catch (e) {
  console.log('err: ', e);
}
