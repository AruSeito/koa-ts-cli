import { log, cloneRepo } from '../utils/index';

export const init = async (name: string) => {
  log.success(`🚀创建项目:${name}`);

  await cloneRepo('github:AruSeito/koa-ts-server-template', name);
};
