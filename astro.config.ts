// @ts-check
import node from "@astrojs/node"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  // https://docs.astro.build/en/guides/integrations-guide/node/
  adapter: node({ mode: "standalone" }),

  // https://docs.astro.build/en/reference/configuration-reference/#vite
  vite: {
    build: { chunkSizeWarningLimit: 1500 }, // Default: 500 KiB
    plugins: [tailwindcss()],
  },
})
