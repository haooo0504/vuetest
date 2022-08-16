import { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/user/info",
    method: "get",
    response: ({}) => {
      return {
        code: 200,
        message: "成功",
        type: "success",
        result: {
          name: "admin",
          age: 18,
          avatar: "/123.jpg",
          permissions: ["editor_markdown", "article_edit"],
        },
      };
    },
  },
  {
    url: "/api/login",
    method: "post",
    response: ({}) => {
      return {
        code: 200,
        message: "登入成功",
        type: "success",
        result: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
