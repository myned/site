// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Wiki",

      // https://starlight.astro.build/guides/customization/#edit-links
      // editLink: {
      //   baseUrl: "https://git.bjork.tech/myned/site/_edit/master/src/content/docs/",
      // },

      // https://starlight.astro.build/guides/customization/#add-your-logo
      logo: {
        src: "./public/favicon.svg",
      },

      // https://starlight.astro.build/guides/customization/#social-links
      social: [
        // TODO: Use Forgejo icon
        { icon: "seti:git", label: "Forgejo", href: "https://git.bjork.tech/myned/site" },
        { icon: "github", label: "GitHub", href: "https://github.com/myned/site" },
      ],

      // https://starlight.astro.build/guides/sidebar/
      sidebar: [
        {
          label: "Linux",
          autogenerate: { directory: "Linux" },
        },
      ],
    }),
  ],
});
