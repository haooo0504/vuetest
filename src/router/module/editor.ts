import type { RouteRecordRaw } from "vue-router";

export default {
  name: "editor",
  path: "/editor",
  component: () => import("@/layouts/admin.vue"),
  meta: {
    auth: true,
    menu: {
      title: "編輯器",
      icon: "fas fa-pen",
      isClick: false,
    },
    number: 3,
  },

  children: [
    {
      name: "markdown",
      path: "markdown",
      component: () => import("@/views/editor/markdown.vue"),
      meta: { menu: { title: "markdown" } },
    },
    {
      name: "base",
      path: "base",
      component: () => import("@/views/editor/base.vue"),
      meta: { menu: { title: "base" }, permission: "admin" },
    },
    {
      name: "calendar",
      path: "calendar",
      component: () => import("@/views/editor/calendar.vue"),
      meta: { menu: { title: "calendar" } },
    },
    {
      name: "newSchedule",
      path: "newSchedule",
      component: () => import("@/views/editor/newSchedule.vue"),
      meta: { menu: { title: "newSchedule" } },
    },
    {
      name: "addSchedule",
      path: "addSchedule",
      component: () => import("@/views/editor/addSchedule.vue"),
      meta: { menu: { title: "addSchedule" } },
    },
    {
      name: "toastcal",
      path: "toastcal",
      component: () => import("@/views/editor/toastcal.vue"),
      meta: { menu: { title: "toastcal" } },
    },
  ],
} as RouteRecordRaw;
