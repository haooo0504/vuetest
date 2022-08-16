import { http } from "@/plugin/axios";

export function memberlist() {
  return http.request<any>({
    url: `member`,
    method: "get",
  });
}
