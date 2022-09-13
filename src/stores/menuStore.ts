import { defineStore } from "pinia";
import type { User } from "@/apis/userApi";
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw,
} from "vue-router";
import type { IMenu } from "types/menu";
import router from "@/router";
import utils from "@/utils";
import { CacheEnum } from "@/enum/cacheEnum";
import { ref } from "vue";
import store from "@/utils/store";
import autoload from "@/router/autoload";

export default defineStore({
  id: "menu",
  state: () => {
    return {
      menus: [] as IMenu[] | null,
      historyMenu: [] as IMenu[],
      close: ref(store.get(CacheEnum.MENU_IS_CLOSE) ?? false),
      route: ref(null as null | RouteLocationNormalized),
      isMenuCollapse: <boolean>store.get(CacheEnum.MENU_IS_CLOSE) ?? false,
      isHistoryCollapse:
        <boolean>store.get(CacheEnum.HISTORYLINK_IS_SHOW) ?? true,
      isBreadcrumbCollapse:
        <boolean>store.get(CacheEnum.BREADCRUMB_IS_SHOW) ?? true,
    };
  },
  actions: {
    async init() {
      this.getMenuByRoutes();
      this.historyMenu = this.getHistoryMenu();
    },
    getHistoryMenu() {
      const routes = [] as RouteRecordRaw[];
      router.getRoutes().map((r) => routes.push(...r.children));

      let menus: IMenu[] = utils.store.get(CacheEnum.HISROTY_MENU) ?? [];
      return menus.filter((m) => {
        return routes.some((r) => r.name == m.route);
      });
    },
    toggleState() {
      this.close = !this.close;
      store.set(CacheEnum.MENU_IS_CLOSE, this.close);
      // console.log(this.close);
    },
    setCurrentMenu(route: RouteLocationNormalizedLoaded) {
      this.menus?.forEach((m) => {
        m.isClick = false;
        m.children?.forEach((c) => {
          c.isClick = false;
          if (c.route == route.name) {
            m.isClick = true;
            c.isClick = true;
          }
        });
      });
    },
    removeHistoryMenu(menu: IMenu) {
      const index = this.historyMenu.indexOf(menu);
      this.historyMenu.splice(index, 1);
      utils.store.set(CacheEnum.HISROTY_MENU, this.historyMenu);
    },
    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return;
      this.route = route;
      const menu: IMenu = { ...route.meta.menu, route: route.name as string };
      const isHas = this.historyMenu.some((menu) => menu.route == route.name);
      if (!isHas) this.historyMenu.unshift(menu);
      if (this.historyMenu.length > 10) {
        this.historyMenu.pop();
      }
      utils.store.set(CacheEnum.HISROTY_MENU, this.historyMenu);
    },
    async getMenuByRoutes() {
      // console.log(
      //   router.getRoutes().filter((route) => {
      //     return route;
      //   })
      // );
      this.menus = router
        .getRoutes()
        .filter((route) => route.children.length && route.meta.menu)
        .sort((a, b) => {
          return a.meta.number! - b.meta.number!;
        })
        .map((route) => {
          let menu: IMenu = { ...route.meta.menu };

          menu.children = route.children
            .filter((route) => route.meta?.menu)
            .map((route) => {
              return { ...route.meta?.menu, route: route.name };
            }) as IMenu[];
          return menu;
        })
        .filter((menu) => {
          // console.log(menu);
          return menu.children?.length;
        });
      // console.log(this.menus);
    },
    toggleMenu() {
      this.isMenuCollapse = !this.isMenuCollapse;
      store.set(CacheEnum.MENU_IS_CLOSE, this.isMenuCollapse);
    },

    // 開關歷史菜單
    toggleHistoryLink() {
      store.set(CacheEnum.HISTORYLINK_IS_SHOW, this.isHistoryCollapse);
    },
    // 開關麵包屑
    toggleBreadcrumb() {
      store.set(CacheEnum.BREADCRUMB_IS_SHOW, this.isBreadcrumbCollapse);
    },
  },
});
