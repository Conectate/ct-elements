import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from 'vitepress';

let development = process.env.NODE_ENV != "production";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(__dirname, "../../src");
const rootDir = path.resolve(__dirname, "../../");

console.log("srcDir", srcDir);
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite:{
    server: {
      port: 3081,
      host: "0.0.0.0"
    },
    resolve: {
      // conditions: ["dev"],
      alias: [
        // Subpaths importing compiled names with ".js" -> map to source ".ts"
        { find: /^@conectate\/components\/(.+)\.js$/, replacement: srcDir + "/$1" },
        // Subpaths importing without extension -> map to source ".ts"
        { find: /^@conectate\/components\/(.+)$/, replacement: srcDir + "/$1" }
      ]
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(development ? "development" : "production")
    },
  },
  title: "hireX Docs",
  description: "Documentación Técnica hireX",
  head: [['link', { rel: 'icon', href: '/res/favicon.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guía', link: '/start/intro' }
    ],

    sidebar: [
      {
        text: 'Inicio',
        items: [
          { text: 'Introducción', link: '/00-start/intro' },
          { text: 'Inicio rápido', link: '/00-start/quick-start' },
        ]
      },
      {
        text: 'Componentes',
        items: [
          { text: 'ct-button', link: '/ct-button/button' },
          { text: 'ct-input', link: '/ct-input/input' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/conectate' },
      { icon: 'x', link: 'https://x.com/hirex_app' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/hirexapp' },
    ]
  }
})
