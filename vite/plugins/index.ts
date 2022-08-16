import vue from "@vitejs/plugin-vue";
import type { Plugin } from "vite";
import { autoImport } from "./autoImport";
import { setupMockPlugin } from "./mock";

export default function setupPlugins(isBuild: boolean) {
  const plugins: Plugin[] = [vue()];
  plugins.push(setupMockPlugin(isBuild));
  autoImport(plugins);
  return plugins;
}
