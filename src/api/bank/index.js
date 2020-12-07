import request from "@/utils/request";
// 数据面板
export function getdataPanal() {
  return request({
    url: "/bank/bank/index/",
    method: "get",
  });
}

// 非快贷产品管理-列表接口
export function getProductList(data) {
  return request({
    url: "/bank/bank/product/list",
    method: "get",
    params: data,
  });
}
// 详情
export function getProductDetail(id) {
  return request({
    url: "/bank/bank/product/detail/" + id,
    method: "get",
  });
}

// 非快贷产品管理-新增保存接口
export function saveProducts(data) {
  return request({
    url: "/bank/bank/product/save",
    method: "post",
    data,
  });
}
// 非快贷产品管理-修改保存接口
export function updataProducts(data) {
  return request({
    url: "/bank/bank/product/update",
    method: "post",
    data,
  });
}
// 非快贷产品管理-删除接口
export function deleteProducts(id) {
  return request({
    url: "/bank/bank/product/delete/" + id,
    method: "get",
  });
}
// 状态停用接口
export function disableProducts(id) {
  return request({
    url: "/bank/bank/product/disable/" + id,
    method: "get",
  });
}
// 启用
export function UsingProduct(id) {
  return request({
    url: "/bank/bank/product/enable/" + id,
    method: "get",
  });
}
// 非快贷产品所需材料上传接口
export function materialUpload(data) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/bank/bank/product/materialUpload",
    method: "post",
    data,
  });
}

// 非快贷产品头像上传
export function IconUpload(data) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/bank/bank/product/logoUpload",
    method: "post",
    data,
  });
}
// 文件删除
export function deleteFiles(data) {
  return request({
    url: "/bank/bank/product/fileDelete",
    method: "post",
    data,
  });
}
// 材料删除/bank/bank/product/materialDelete/
export function deletematerial(id) {
  return request({
    url: "/bank/bank/product/materialDelete/" + id,
    method: "get",
  });
}

// 快贷产品管理-新增保存接口
export function saveQuickProducts(data) {
  return request({
    url: "/bank/bank/product/fSave",
    method: "post",
    data,
  });
}
// 快贷产品管理-快贷列表接口
export function getQuicklist(data) {
  return request({
    url: "/bank/bank/product/fList",
    method: "get",
    params: data,
  });
}

// 快贷产品管理-预览接口
export function previewQuickProducts(data) {
  return request({
    url: "/bank/bank/product/preview",
    method: "post",
    data,
  });
}
// 快贷产品管理-修改接口
export function updataQuickProducts(data) {
  return request({
    url: "/bank/bank/product/update",
    method: "post",
    data,
  });
}
// 非快贷产品-下载材料接口
export function templateDownload(id) {
  return request({
    url: "/bank/bank/product/templateDownload/" + id,
    method: "get",
    resposeType: "blob",
  });
}
// 行业数据
export function getIndustryData() {
  return request({
    url: "/bank/bank/product/industry",
    method: "get",
  });
}
// 融资超市列表接口
export function getMarketlist(data) {
  return request({
    url: "/bank/bank/market/list",
    method: "get",
    params: data,
  });
}
// 融资超市详情接口
export function MarketDetail(id) {
  return request({
    url: "/bank/bank/market/detail/" + id,
    method: "get",
  });
}
//融资超市认领接口
export function applyFinace(id) {
  return request({
    url: "/bank/bank/market/toApply/" + id,
    method: "get",
  });
}
// 我的认领列表接口
export function getClaimlist(data) {
  return request({
    url: "/bank/bank/claim/list",
    method: "get",
    params: data,
  });
}
// 我的认领详情接口
export function claimDetail(id) {
  return request({
    url: "/bank/bank/claim/detail/" + id,
    method: "get",
  });
}
//我的认领审核接口
export function auditSubmit(data) {
  return request({
    url: "/bank/bank/claim/auditSubmit",
    method: "post",
    data,
  });
}
//我的认领放款完成接口
export function loanFinish(data) {
  return request({
    url: "/bank/bank/claim/loanFinish",
    method: "post",
    data,
  });
}
//我的认领放款状态标注接口
export function loanStatusUpdate(data) {
  return request({
    url: "/bank/bank/claim/loanStatusUpdate",
    method: "post",
    data,
  });
}
// 智能推荐 -》详情接口
export function financeDemand() {
  return request({
    url: "/bank/bank/finance/demand",
    method: "get",
  });
}
// 智能推荐 -》 融资需求推荐
export function recommend(data) {
  return request({
    url: "/bank/bank/finance/submit",
    method: "post",
    data,
  });
}
// 智能推荐 -》 用电企业推荐
export function recommendEnterprise(data) {
  return request({
    url: "/bank/bank/electricity/submit",
    method: "get",
    params: data,
  });
}
// 用电企业推荐 -》详情接口
export function electricityDemand() {
  return request({
    url: "/bank/bank/electricity/demand",
    method: "get",
  });
}
// 立即认领
export function immediatelyClaim(id) {
  return request({
    url: "/bank/bank/finance/claim/" + id,
    method: "get",
  });
}
// 用电企业-》标记接口
export function electricityTag(id) {
  return request({
    url: "/bank/bank/electricity/tag/" + id,
    method: "post",
  });
}
// 用电企业-》取消标记接口
export function electricityCancelTag(id) {
  return request({
    url: "/bank/bank/electricity/tagCancel/" + id,
    method: "post",
  });
}
// 用电企业 -》推荐查看详情
export function electricityDetail(id) {
  return request({
    url: "/bank/bank/electricity/detail/" + id,
    method: "get",
  });
}
// 用电企业 -》关闭推荐
export function closeElectricity() {
  return request({
    url: "/bank/bank/electricity/close",
    method: "get",
  });
}
// 融资需求 -》关闭推荐
export function closeFinance() {
  return request({
    url: "/bank/bank/finance/close",
    method: "get",
  });
}

/**-------------------------- 风险监控----------------------------------------- */
// 融资企业风险监控
export function riskList(data) {
  return request({
    url: "/bank/bank/risk/list",
    method: "get",
    params: data,
  });
}
// 风险监控详情
export function riskDetail(id) {
  return request({
    url: "/bank/bank/risk/detail/" + id,
    method: "get",
  });
}
// 不良信息
export function badInfo(data) {
  return request({
    url: "http://39.105.160.102:8002/api/v1/bad-behaviour/gwds-search",
    method: "post",
    data,
  });
}
// 解除风险接口
export function removeRisk(ids) {
  return request({
    url: "/bank/bank/risk/removeRisk/" + ids,
    method: "get",
  });
}
// 添加企业风险监控接口
export function addRisk(name) {
  return request({
    url: "/bank/bank/risk/add/" + name,
    method: "get",
  });
}
// 企业名称模糊查询
export function tipEntName(name) {
  return request({
    url: "/bank/bank/risk/prompt/" + name,
    method: "get",
  });
}
// 移除企业编号
export function removeEntMonitoring(name) {
  return request({
    url: "/bank/bank/risk/remove/" + name,
    method: "get",
  });
}
/**-------------------------- 融资申请管理----------------------------------------- */
// 列表接口
export function getfinanceList(data) {
  return request({
    url: "/bank/bank/finance/list",
    method: "get",
    params: data,
  });
}
// 详情
export function getfinanceDetail(id) {
  return request({
    url: "/bank/bank/finance/orderDetail/" + id,
    method: "get",
  });
}
// 放款完成
export function financeLoanFinish(data) {
  return request({
    url: "/bank/bank/finance/loanFinish",
    method: "post",
    data: data,
  });
}
// 还款状态标注
export function financeloanStatusUpdate(data) {
  return request({
    url: "/bank/bank/finance/loanStatusUpdate",
    method: "post",
    data: data,
  });
}
// 审核
export function financeloanAuditSubmit(data) {
  return request({
    url: "/bank/bank/finance/auditSubmit",
    method: "post",
    data: data,
  });
}
