import type { RouteRecordRaw } from "vue-router";

export default {
  name: "manage",
  path: "/manage",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "管理頁面",
      icon: "fas fa-pen-to-square",
      isClick: false,
    },
    number: 2,
  },
  children: [
    {
      name: "manage.user",
      path: "user",
      component: () => import("@/views/manage/manage.vue"),
      meta: { menu: { title: "用戶管理" } },
    },
    {
      name: "member.info",
      path: "info",
      component: () => import("@/views/member/info.vue"),
      meta: { menu: { title: "個人中心" } },
    },
  ],
} as RouteRecordRaw;
