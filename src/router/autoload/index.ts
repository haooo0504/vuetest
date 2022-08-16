import userStore from "@/stores/userStore";
import util from "@/utils";
import type { Router, RouteRecordName, RouteRecordRaw } from "vue-router";
import autoloadModuleRoutes from "./module";
import getRoutes from "./view";
import _ from "lodash";

let routes = _.cloneDeep(autoloadModuleRoutes());
interface rr {
  re: RouteRecordName;
  r: RouteRecordRaw;
}
export const rl = <rr[]>[];

async function autoload(router: Router) {
  const user = userStore();
  routes.forEach((route) => {
    let re = route.name!;
    console.log(route);
    route.children = route.children?.filter((r) => {
      const permission = r.meta?.permission;
      if (permission) {
        rl.push({ re, r });
      }
      return permission ? user.info?.permissions?.includes(permission) : true;
    });
  });
  console.log(routes);
  routes.forEach((r) => router.addRoute(r));
  console.log(router.getRoutes());
}
export default autoload;
// const routes = env.VITE_ROUTE_AUTOLOAD ? getRoutes() : ([] as RouteRecordRaw[]);
