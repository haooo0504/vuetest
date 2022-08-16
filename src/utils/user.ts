import userApi, { type ILoginData } from "@/apis/userApi";
import { CacheEnum } from "@/enum/cacheEnum";
import store from "./store";
import util from "./index";
import router from "@/router";
import { remove } from "lodash";
import userStore from "../stores/userStore";
import menuStore from "../stores/menuStore";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { rl } from "@/router/autoload/index";

export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME));
}

export async function login(values: ILoginData) {
  const {
    result: { token },
  } = await userApi.login(values);
  util.store.set(
    CacheEnum.TOKEN_NAME,
    {
      token,
      expire: 50000,
    },
    50000
  );
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
  router.push({ name: routeName });
}

export function logout() {
  rl.forEach((r) => {
    console.log(r);
    if (router.hasRoute(r.r.name!)) router.removeRoute(r.r.name!);
  });
  store.remove(CacheEnum.TOKEN_NAME);
  store.remove(CacheEnum.USER_INFO);
  store.remove(CacheEnum.HISROTY_MENU);
  store.remove(CacheEnum.CURRENT_USER);
  store.remove(CacheEnum.CURRENT_PHOTO);
  store.remove(CacheEnum.REDIRECT_ROUTE_NAME);
  router.push("/");

  userStore().info = null;
  userStore().currentname = null;
  ElMessage({
    message: "登出成功",
    type: "success",
    duration: 2000,
  });
}
