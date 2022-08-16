import { Random } from "mockjs";
import type { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/member",
    method: "get",
    response: ({}) => {
      return {
        errno: 0,
        code: 200,
        message: "成功",
        type: "success",
        result: [
          {
            id: 500,
            email: "abc123@gmail.com",
            mg_state: true,
            mobile: "0900000123",
            role_name: "業務員",
            username: "李小名",
          },
          {
            id: 501,
            email: "def456@gmail.com",
            mg_state: true,
            mobile: "0900456123",
            role_name: "醫生",
            username: "陳小明",
          },
        ],
      };
    },
  },
] as MockMethod[];
