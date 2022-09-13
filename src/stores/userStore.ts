import { defineStore } from "pinia";
import type { ILoginData, IRegisterData, User } from "@/apis/userApi";
import userApi from "@/apis/userApi";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  updateEmail,
} from "firebase/auth";
import { CacheEnum } from "@/enum/cacheEnum";
import { msg } from "@/utils/msg";
import router from "@/router";
import utils from "@/utils";
import { firebaseStores } from "./firebaseStore";
import { rl } from "../router/autoload/index";
import store from "@/utils/store";
import autoloadModuleRoutes from "@/router/autoload/module";
import _ from "lodash";

export default defineStore({
  id: "user",
  state: () => {
    return {
      info: {} as null | IUser,
      auth: getAuth(),
      firebasestore: firebaseStores(),
      currentname: ref(store.get(CacheEnum.CURRENT_USER)),
      currentphoto: ref(store.get(CacheEnum.CURRENT_PHOTO)),
    };
  },
  actions: {
    // async getUserInfo() {
    //   const res = await userApi.info();
    //   this.info = res.result;
    // },
    async getUserInfo() {
      // this.info = (await utils.store.get(CacheEnum.USER_INFO)) as null | IUser;
      if (utils.store.get(CacheEnum.TOKEN_NAME)) {
        this.info = (await this.firebasestore.get(
          "users",
          await utils.store.get(CacheEnum.TOKEN_NAME)
        )) as null | IUser;
      }
    },
    async permissionlist() {
      await this.getUserInfo();
      let routes1 = _.cloneDeep(autoloadModuleRoutes());

      routes1.forEach((route) => {
        route.children = route.children?.filter((r) => {
          const permission = r.meta?.permission;

          return permission
            ? this.info?.permissions?.includes(permission)
            : true;
        });
      });
      routes1.forEach((r) => router.addRoute(r));
      // rl.forEach((r: any) => {
      //   if (this.info?.permissions.includes(r.r.meta.permission)) {
      //     console.log(r.re, r.r);

      //     router.addRoute(r.re, r.r);
      //   }
      // });

      // routes = routes.map((route) => {
      //   route.children = route.children?.filter((r) => {
      //     const permission = r.meta?.permission;
      //     return permission ? user.info?.permissions?.includes(permission) : true;
      //   });

      //   return route;
      // });
      // routes.forEach((r) => router.addRoute(r));
    },
    async createUser(userForm: IRegisterData) {
      const userName = await this.firebasestore.get("users", userForm.name);
      if (userName != null) {
        msg("此名稱已被使用", "error");
      } else {
        createUserWithEmailAndPassword(
          this.auth,
          `${userForm.account}@gmail.com`,
          userForm.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            const routeName =
              utils.store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
            if (this.auth.currentUser) {
              updateProfile(this.auth.currentUser, {
                displayName: userForm.account,
              })
                .then(async () => {
                  this.firebasestore.add("users", userForm.account, {
                    ...userForm,
                    permissions: [],
                    active: true,
                  });
                  this.info = (await this.firebasestore.get(
                    "users",
                    userForm.account
                  )) as IUser;
                  utils.store.set(CacheEnum.USER_INFO, this.info);

                  utils.store.set(CacheEnum.TOKEN_NAME, this.info.account);
                  await this.permissionlist();
                  router.push({ name: routeName });
                  msg(`歡迎${userForm.name}`);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    async login(loginForm: ILoginData) {
      const user = (await this.firebasestore.get(
        "users",
        loginForm.account
      )) as IUser;

      if (user != null && loginForm.password === user.password) {
        utils.store.set(CacheEnum.TOKEN_NAME, user.account);
        utils.store.set(CacheEnum.USER_INFO, user);
        await this.permissionlist();
        if (user.active) {
          const routeName =
            utils.store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
          router.push({ name: routeName });

          msg(`歡迎${user.name}`);
        } else {
          this.info = null;
          msg("您以被停權，請聯繫管理員", "error");
        }
      } else {
        msg("帳號或密碼錯誤", "error");
      }
      // signInWithEmailAndPassword(
      //   this.auth,
      //   `${loginForm.account}@gmail.com`,
      //   loginForm.password
      // )
      //   .then(async (userCredential) => {
      //     await this.permissionlist();
      //     const user = userCredential.user;
      //     if (this.info?.active) {
      //       utils.store.set(CacheEnum.TOKEN_NAME, user.uid);
      //       const routeName =
      //         utils.store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? "home";
      //       router.push({ name: routeName });
      //       msg(`歡迎${user.displayName}`);
      //     } else {
      //       this.info = null;
      //       msg("您以被停權，請聯繫管理員", "error");
      //     }
      //   })
      //   .catch((error) => {
      //     msg("帳號或密碼錯誤", "error");
      //     console.error(error);
      //   });
    },
    async changeName(id: string, account: string, obj: object) {
      this.firebasestore.update(id, account, obj);
      this.currentname = (await this.firebasestore.get(id, account))?.name;
      store.set(CacheEnum.CURRENT_USER, this.currentname);
      return this.currentname;
      // return (this.currentname = a?.name);
    },
    async photo(id: string, account: string) {
      this.currentphoto = (await this.firebasestore.get(id, account))?.avatar;
      store.set(CacheEnum.CURRENT_PHOTO, this.currentphoto);
    },
  },
});
