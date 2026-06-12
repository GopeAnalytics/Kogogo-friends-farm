import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/feathered-friends-farm",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
