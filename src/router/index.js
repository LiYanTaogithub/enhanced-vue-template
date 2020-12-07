import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: (resolve) => require(["@/views/redirect"], resolve),
      },
    ],
  },
  {
    path: "/login",
    component: (resolve) => require(["@/views/login"], resolve),
    hidden: true,
  },
  {
    path: "/404",
    component: (resolve) => require(["@/views/error/404"], resolve),
    hidden: true,
  },
  {
    path: "/401",
    component: (resolve) => require(["@/views/error/401"], resolve),
    hidden: true,
  },
  // {
  //   path: "",
  //   component: Layout,
  //   redirect: "index",
  //   children: [
  //     {
  //       path: "index",
  //       component: (resolve) => require(["@/views/index"], resolve),
  //       name: "首页",
  //       meta: { title: "首页", icon: "dashboard", noCache: true },
  //       hidden: true,
  //     },
  //   ],
  // },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "/index",
        component: (resolve) => require(["@/views/bank/data-panel"], resolve),
        name: "数据面板",
        meta: {
          title: "数据面板",
          icon: "dashboard",
          noCache: true,
          // affix: true, // 固定tag
        },
      },
    ],
  },
  {
    path: "/my-financial-products",
    // component: () => import("@/views/bank/my-financial-products"),
    component: Layout,
    redirect: "/my-financial-products/quick-loan-products",
    meta: { title: "我的金融产品" },
    children: [
      {
        path: "quick-loan-products",
        component: () =>
          import("@/views/bank/my-financial-products/quick-loan-products"),
        name: "快贷产品管理",
        meta: { title: "快贷产品管理" },
      },
      {
        path: "no-quick-products",
        component: () =>
          import("@/views/bank/my-financial-products/no-quick-products"),
        name: "非快贷产品管理",
        meta: { title: "非快贷产品管理" },
      },
      {
        path: "detail",
        component: () =>
          import("@/views/bank/my-financial-products/no-quick-products/detail"),
        name: "金融产品详情",
        meta: { title: "金融产品详情" },
        hidden: true,
      },
      {
        path: "products-info",
        component: () =>
          import(
            "@/views/bank/my-financial-products/no-quick-products/products-info"
          ),
        name: "添加/修改金融产品",
        meta: { title: "添加/修改金融产品" },
        hidden: true,
      },
    ],
  },
  // {
  //   path: "/financing-application-management",
  //   component: Layout,
  //   redirect: "/financing-application-management/quick-loan-application",
  //   meta: { title: "融资申请管理" },
  //   // hidden: true,
  //   children: [
  //     {
  //       path: "quick-loan-application",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-application-management/quick-loan-application"
  //         ),
  //       name: "智能快贷申请",
  //       meta: { title: "智能快贷申请" },
  //     },
  //     {
  //       path: "no-quick-loan-application",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-application-management/no-quick-loan-application"
  //         ),
  //       name: "非快贷产品申请",
  //       meta: { title: "非快贷产品申请" },
  //     },
  //     {
  //       path: "application-detail",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-application-management/application-detail"
  //         ),
  //       name: "详情",
  //       hidden: true,
  //       meta: { title: "详情" },
  //     },
  //   ],
  // },
  // {
  //   path: "/financing-supermarket",
  //   component: Layout,
  //   redirect: "/financing-supermarket/supermarket-list",
  //   meta: { title: "融资超市" },
  //   children: [
  //     {
  //       path: "supermarket-list",
  //       component: () =>
  //         import("@/views/bank/financing-supermarket/supermarket-list"),
  //       name: "融资超市列表",
  //       meta: { title: "融资超市列表" },
  //     },
  //     {
  //       path: "supermarket-detail",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-supermarket/supermarket-list/supermarket-detail"
  //         ),
  //       hidden: true,
  //       name: "融资超市详情",
  //       meta: { title: "融资超市详情" },
  //     },
  //     {
  //       path: "report-detail",
  //       component: () => import("@/components/Bank/report"),
  //       hidden: true,
  //       name: "报告模板",
  //       meta: { title: "报告模板" },
  //     },
  //     {
  //       path: "my-claim",
  //       component: () => import("@/views/bank/financing-supermarket/my-claim"),
  //       name: "我的认领",
  //       meta: { title: "我的认领" },
  //     },
  //     {
  //       path: "my-claim-detail",
  //       component: () =>
  //         import("@/views/bank/financing-supermarket/my-claim/my-claim-detail"),
  //       hidden: true,
  //       name: "我的认领详情",
  //       meta: { title: "我的认领详情" },
  //     },
  //     {
  //       path: "intelligent-recommendation",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-supermarket/intelligent-recommendation/financing-demand-recommendation"
  //         ),
  //       name: "智能推荐",
  //       meta: { title: "智能推荐" },
  //     },
  //     {
  //       path: "demand-detail",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-supermarket/supermarket-list/supermarket-detail"
  //         ),
  //       hidden: true,
  //       name: "需求详情",
  //       meta: { title: "需求详情" },
  //     },
  //     {
  //       path: "enterprise-detail",
  //       component: () =>
  //         import(
  //           "@/views/bank/financing-supermarket/intelligent-recommendation/financing-demand-recommendation/enterprise-detail"
  //         ),
  //       hidden: true,
  //       meta: { title: "企业详情" },
  //     },
  //   ],
  // },
  // {
  //   path: "/risk-monitoring",
  //   component: Layout,
  //   redirect: "/risk-monitoring/financing-enterprise-monitoring",
  //   meta: { title: "风险监控" },
  //   children: [
  //     {
  //       path: "financing-enterprise-monitoring",
  //       component: () =>
  //         import(
  //           "@/views/bank/risk-monitoring/financing-enterprise-monitoring"
  //         ),
  //       name: "融资企业风险监控",
  //       meta: { title: "融资企业风险监控" },
  //     },
  //     {
  //       path: "add-enterprise-monitoring",
  //       component: () =>
  //         import("@/views/bank/risk-monitoring/add-enterprise-monitoring"),
  //       meta: { title: "添加企业风险监控" },
  //       name: "添加企业风险监控",
  //       // hidden: true,
  //     },
  //     {
  //       path: "risk-monitoring-detail",
  //       component: () =>
  //         import("@/views/bank/risk-monitoring/risk-monitoring-detail"),
  //       meta: { title: "风险详情" },
  //       hidden: true,
  //     },
  //   ],
  // },
  // {
  //   path: "/user",
  //   component: Layout,
  //   // hidden: true,
  //   redirect: "noredirect",
  //   children: [
  //     {
  //       path: "profile",
  //       component: (resolve) =>
  //         require(["@/views/system/user/profile/index"], resolve),
  //       name: "个人中心",
  //       meta: { title: "个人中心", icon: "user" },
  //     },
  //   ],
  // },
];

export default new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});
