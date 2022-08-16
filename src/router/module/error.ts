import type { RouteRecordRaw } from "vue-router";

export default {
  name: "error",
  path: "/error",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "錯誤頁面",
      icon: "fas fa-bomb",
      isClick: false,
    },
    number: 4,
  },

  children: [
    {
      name: "error.403",
      path: "403",
      component: () => import("@/views/error/403.vue"),
      meta: { menu: { title: "403" } },
    },
    {
      name: "error.404",
      path: "404",
      component: () => import("@/views/error/404.vue"),
      meta: { menu: { title: "404" } },
    },

    {
      name: "error.500",
      path: "500",
      component: () => import("@/views/error/500.vue"),
      meta: { menu: { title: "500" } },
    },
  ],
} as RouteRecordRaw;
