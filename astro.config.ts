// @ts-check
import node from "@astrojs/node";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: { plugins: [tailwindcss()] },

  integrations: [
    // // https://starlight.astro.build/reference/configuration/
    // starlight({
    //   title: "Wiki", //!! Required
    //   // https://starlight.astro.build/guides/css-and-tailwind/
    //   customCss: ["./src/styles/global.css"],
    //   // https://starlight.astro.build/guides/customization/#edit-links
    //   // editLink: { baseUrl: "https://git.bjork.tech/myned/site/_edit/master/src/content/docs/" },
    //   // https://expressive-code.com/reference/configuration/
    //   expressiveCode: {
    //     // https://expressive-code.com/guides/themes/
    //     themes: ["solarized-dark"],
    //     // https://expressive-code.com/reference/style-overrides/
    //     styleOverrides: {
    //       borderRadius: "0.5rem",
    //       // https://expressive-code.com/key-features/frames/
    //       frames: {
    //         frameBoxShadowCssValue: "none", // Disable shadow
    //         terminalTitlebarBackground: "var(--color-base-200)",
    //       },
    //     },
    //   },
    //   // https://starlight.astro.build/guides/customization/#add-your-logo
    //   logo: { src: "./public/favicon.svg" },
    //   // https://starlight.astro.build/guides/customization/#social-links
    //   social: [
    //     {
    //       // TODO: Use Forgejo icon
    //       icon: "seti:git",
    //       label: "Forgejo",
    //       href: "https://git.bjork.tech/myned/site",
    //     },
    //     {
    //       icon: "github",
    //       label: "GitHub",
    //       href: "https://github.com/myned/site",
    //     },
    //   ],
    //   // https://starlight.astro.build/guides/sidebar/
    //   sidebar: [
    //     {
    //       label: "Development",
    //       autogenerate: { directory: "wiki/Development" },
    //     },
    //     {
    //       label: "Linux",
    //       autogenerate: { directory: "wiki/Linux" },
    //     },
    //   ],
    // }),
  ],

  // https://docs.astro.build/en/guides/integrations-guide/node/
  adapter: node({
    mode: "standalone",
  }),
});
