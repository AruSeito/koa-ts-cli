import { log, cloneRepo, installPackage } from '../utils/index';

export const init = async (name: string) => {
  log.success(`🚀创建项目:${name}`);

  try {
    //clone远程模板
    await cloneRepo('github:AruSeito/koa-ts-server-template', name);

    //安装依赖
    await installPackage(name);
  } catch (e) {
    console.log(e);
  }
};
