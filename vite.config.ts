import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import alias from "./vite/alias";
import setupPlugins from "./vite/plugins";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias,
//   }
// })

export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command == "build";
  const root = process.cwd();

  return {
    plugins: [...setupPlugins(isBuild), visualizer()],
    resolve: {
      alias,
    },
  };
};
