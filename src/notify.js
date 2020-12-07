import SockJS from "sockjs-client";
import Stomp from "stompjs";
import store from "./store";
import router from "@/router";
import { Notification } from "element-ui";

let stomp;

export default function connect() {
  if (!stomp || !stomp.connected) {
    const sockJS = new SockJS(`//${process.env.VUE_APP_WS_URL}/ws`); // 请求地址
    stomp = Stomp.over(sockJS); // 格式化消息
    stomp.heartbeat.outgoing = 10000; // 客户端向服务端发送心跳包
    stomp.heartbeat.incoming = 0; //服务端 不向客户端发送心跳包
    // 向服务器发起websocket连接
    stomp.connect(
      {},
      () => {
        // 订阅事件类型 发送关于的什么的通知
        stomp.subscribe(`/token/01_${store.state.user.name}/event`, (res) => {
          // 服务器推送的数据
          const content = JSON.parse(res.body);
          const { data } = content;
          const { result } = data;
          const { title, msg, id, type } = data;
          // 客户端要提示的消息配置
          const options = {
            title,
            message: msg,
            onClick: () => {
              // 跳转 并刷新详情页
              // 金融产品状态变更
              if (
                type === "product" &&
                router.currentRoute.path !== "/my-financial-products/detail"
              ) {
                router.push({
                  path: "/my-financial-products/detail",
                  query: { id },
                });
              }
              // 融资申请管理
              if (
                type === "order" &&
                router.currentRoute.path !==
                  "/financing-application-management/application-detail"
              ) {
                router.push({
                  path: "/financing-application-management/application-detail",
                  query: { id },
                });
              }
            },
          };
          // 存到store ，如果当前在详情页，就通过watch监听变化，触发详情页刷新
          store.commit(
            "app/SET_ORDER_DETAIL_TOGGLE",
            !store.state.app.orderStatus
          );
          store.commit("app/SET_HINT_DISPLAY", true);
          store.commit(
            `app/SET_SYSTEM_MSG_TOGGLE`,
            !store.state.app.systemMsgToggle
          );
          if (result === "pass") {
            options.type = "success";
          } else if (result === "fail") {
            options.type = "error";
          } else if (result === "default") {
            options.type = "info";
          }
          Notification(options);
        });
      },
      // 若出现超时未连接成功的情况就会重新连接一次
      connect
    );
  }
  return stomp;
}
