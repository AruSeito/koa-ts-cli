#!/usr/bin/env node
const { Command } = require("commander");
const packageInfo = require("../../package");
const { init } = require("../lib/command/init");

const program = new Command();

program
  .version(
    packageInfo.version,
    "-v, --version",
    "display version for koa-ts-cli"
  )
  .usage("<command> [options]");

program
  .command("init <name>")
  .description("init a koa-ts template project")
  .action((name: string) => {
    init(name);
  });

try {
  program.parse(process.argv);
} catch (e) {
  console.log("err: ", e);
}
