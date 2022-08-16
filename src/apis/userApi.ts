import { http } from "@/plugin/axios";
export interface User {
  name: string;
  age: number;
  active: boolean;
  avatar: string;
  permissions: string[];
}
export interface IRegisterData {
  account: string;
  password: string;
  name: string;
  avatar?: string;
  token?: string;
}
function info() {
  return http.request<User>({
    url: `user/info`,
  });
}
interface LoginInterface {
  token: string;
}
export interface ILoginData {
  account: string;
  password: string;
}
export function login(data: ILoginData) {
  return http.request<LoginInterface>({
    url: `login`,
    method: "post",
    data,
  });
}

export default { info, login };
