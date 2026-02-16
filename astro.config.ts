import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
// import remarkToc from "remark-toc";
// import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      // remarkToc,
      // [
      //   remarkCollapse,
      //   {
      //     test: "Table of contents",
      //   },
      // ],
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: true,
      transformers: [
        transformerNotationDiff(),
        transformerMetaHighlight(),
        transformerNotationWordHighlight(),
      ] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
  redirects: {
    "/posts": "/blog",
  },
});
