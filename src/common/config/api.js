// 接口请求统一管理
const tabapi = {
  getPublicTbas: "/tabs/tab/listPublic",
};
const systemapi = {};
const commonapi = {
  getBackgroundImage: "/tabs/common/getBackgroundImage",
  uploadIcon: "/tabs/common/uploadIcon",
};
const appapi = {
  getAppList: "/tabs/app/getAppList",
};
export { tabapi };
export { systemapi };
export { appapi };
export { commonapi };
