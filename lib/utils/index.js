const chalk = require('chalk');
const ora = require('ora');
const childProcess = require('child_process');
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
  try {
    process.start(`模板下载......${repo}`);
    await download(repo, dest);
  } catch (e) {
    process.stop(`模板下载失败:${e}`);
  } finally {
    process.succeed('模板下载成功');
  }
}

module.exports.runCmd = (cmd) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, (err, ...arg) => {
      if (err) return reject(err)
      return resolve(...arg)
    })
  })
}

