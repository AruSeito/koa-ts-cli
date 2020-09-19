const chalk = require('chalk');
const ora = require('ora');
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));


module.exports.log = {
  warning(msg = '') {
    console.log(chalk.yellow(`${msg}`));
  },
  error(msg = '') {
    console.log(chalk.red(`${msg}`));
  },
  success(msg = '') {
    console.log(chalk.green(`${msg}`));
  }
}

module.exports.cloneRepo = async (repo, dest) => {
  const process = ora();
  process.start(`下载......${repo}`);
  await download(repo, dest);
  process.succeed(`模板下载成功`);
}

