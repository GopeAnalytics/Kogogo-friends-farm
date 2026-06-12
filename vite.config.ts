import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/Kogogo-friends-farm/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
