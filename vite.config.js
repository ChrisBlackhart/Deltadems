import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "./src/config.js";
import { publicRoutes } from "./src/data/routes.js";

/**
 * Generates robots.txt and sitemap.xml at build time from `config.siteUrl`.
 *
 * These used to be hand-maintained files in public/ with the domain hardcoded
 * in both — which meant the published SEO files silently kept pointing at an
 * old host after a domain change. Generating them makes the canonical URL a
 * single edit in src/config.js, which matters for the eventual move from the
 * Vercel preview domain to the production host.
 *
 * Build-only: robots/sitemap are meaningless against the dev server.
 */
function seoFiles() {
  const origin = config.siteUrl.replace(/\/$/, "");

  return {
    name: "deltadems-seo-files",
    apply: "build",
    generateBundle() {
      const urls = publicRoutes
        .map(
          (r) =>
            `  <url><loc>${origin}${r.path}</loc><priority>${r.priority}</priority></url>`
        )
        .join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at build time from src/config.js + src/data/routes.js. Do not edit by hand. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `# Generated at build time from src/config.js. Do not edit by hand.
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
});
