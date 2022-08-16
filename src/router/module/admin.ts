import type { RouteRecordRaw } from "vue-router";

export default {
  name: "admin",
  path: "/admin",
  redirect: "/admin/home",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "dashboard",
      icon: "fas fa-house",
      isClick: false,
    },
    number: 1,
  },
  children: [
    {
      name: "admin.home",
      path: "home",
      component: () => import("@/views/admin/home.vue"),
      meta: { menu: { title: "dashboard" } },
    },
  ],
} as RouteRecordRaw;
