import chalk = require('chalk');
import ora = require('ora');
import { exec } from 'child_process';
import * as fs from 'fs';
import * as download from 'download-git-repo';
import * as path from 'path';

interface ExecException extends Error {
  cmd?: string;
  killed?: boolean;
  code?: number;
  signal?: NodeJS.Signals;
}
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

/**
 * @description clone repo
 * @param repo 请求的git地址
 * @param dest 目录名称
 */
export const cloneRepo = async (repo: string, dest: string) => {
  return new Promise(async (resolve, reject) => {
    const spinner = ora(`正在从 ${repo} 拉取远程模板...`).start();
    download(repo, dest, { clone: true }, async (err: string) => {
      if (err) {
        spinner.color = 'red';
        spinner.fail(chalk.red('拉取远程模板仓库失败！'));
        return reject(err);
      }
      spinner.color = 'green';
      spinner.succeed(`${chalk.grey('拉取远程模板仓库成功！')}`);
      resolve();
    });
  });
};
/**
 * @description 获取package.json中某字段的值
 * @param field 字段名
 */
export const getPackage = (field: string) => {
  const packagePath = path.resolve(__dirname, '../../../package.json');
  const packageInfoJson = fs.readFileSync(packagePath, 'utf-8');
  const packageInfo = JSON.parse(packageInfoJson);
  return packageInfo[field];
};

export const installPackage = async (dest: string) => {
  const installSpinner = ora('正在安装项目依赖文件，请稍后...').start();
  return new Promise((resolve, reject) => {
    exec(`cd ${dest} && npm install `, (error, stdout, stderr) => {
      if (error) {
        installSpinner.color = 'red';
        installSpinner.fail(chalk.red('安装项目依赖失败，请自行重新安装！'));
        reject(error);
      } else {
        installSpinner.color = 'green';
        installSpinner.succeed('安装成功');
        console.log(`${stderr}${stdout}`);
        console.log(chalk.green(`创建项目 ${chalk.green.bold(dest)} 成功！`));
        console.log(chalk.green(`请进入项目目录 ${chalk.green.bold(dest)} 开始工作吧！😝`));
        resolve();
      }
    });
  });
};
