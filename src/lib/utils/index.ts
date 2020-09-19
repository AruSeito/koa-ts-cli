import chalk = require('chalk');
import ora = require('ora');
import childProcess = require('child_process');
import { promisify } from 'util';
import * as fs from 'fs';
import * as download from 'download-git-repo';
import * as path from 'path';

export const log = {
  warning(msg = '') {
    console.log(chalk.yellow(`${msg}`));
  },
  error(msg = '') {
    console.log(chalk.red(`${msg}`));
  },
  success(msg = '') {
    console.log(chalk.green(`${msg}`));
  },
};

export const cloneRepo = async (repo: string, dest: string) => {
  const process = ora();
  try {
    process.start(`模板下载......${repo}`);
    await promisify(download(repo, dest));
  } catch (e) {
    process.stop();
  } finally {
    process.succeed('模板下载成功');
  }
};

export const runCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

export const getPackage: (field: string) => string = (field: string) => {
  const packagePath = path.resolve(__dirname, '../../../package.json');
  const packageInfoJson = fs.readFileSync(packagePath, 'utf-8');
  const packageInfo = JSON.parse(packageInfoJson);
  return packageInfo[field];
};
