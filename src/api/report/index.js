import request from "@/utils/request";

// 获取报告数据
export function getReportData(data) {
  return request({
    url: "/operate/credit/getCreditReport",
    method: "post",
    data,
  });
}
