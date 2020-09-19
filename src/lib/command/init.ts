const { log, cloneRepo } = require("../utils/index");

module.exports.init = async (name: string) => {
  log.success(`🚀创建项目:${name}`);

  await cloneRepo("github:AruSeito/koa-ts-server-template", name);
};
