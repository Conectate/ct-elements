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
          { text: 'ct-autocomplete-suggestions', link: '/ct-autocomplete-suggestions/autocomplete-suggestions' },
          { text: 'ct-bottom-sheet', link: '/ct-bottom-sheet/bottom-sheet' },
          { text: 'ct-button', link: '/ct-button/button' },
          { text: 'ct-button-helpers', link: '/ct-button-helpers/button-helpers' },
          { text: 'ct-button-menu', link: '/ct-button-menu/button-menu' },
          { text: 'ct-button-split', link: '/ct-button-split/button-split' },
          { text: 'ct-card', link: '/ct-card/card' },
          { text: 'ct-card-dialog', link: '/ct-card-dialog/card-dialog' },
          { text: 'ct-chartjs', link: '/ct-chartjs/chartjs' },
          { text: 'ct-checkbox', link: '/ct-checkbox/checkbox' },
          { text: 'ct-collapse', link: '/ct-collapse/collapse' },
          { text: 'ct-confirm', link: '/ct-confirm/confirm' },
          { text: 'ct-date', link: '/ct-date/date' },
          { text: 'ct-dialog', link: '/ct-dialog/dialog' },
          { text: 'ct-dialog-builder', link: '/ct-dialog-builder/dialog-builder' },
          { text: 'ct-helpers', link: '/ct-helpers/helpers' },
          { text: 'ct-icon', link: '/ct-icon/icon' },
          { text: 'ct-icon-button', link: '/ct-icon-button/icon-button' },
          { text: 'ct-img', link: '/ct-img/img' },
          { text: 'ct-input', link: '/ct-input/input' },
          { text: 'ct-input-autocomplete', link: '/ct-input-autocomplete/input-autocomplete' },
          { text: 'ct-input-container', link: '/ct-input-container/input-container' },
          { text: 'ct-input-phone', link: '/ct-input-phone/input-phone' },
          { text: 'ct-input-wrapper', link: '/ct-input-wrapper/input-wrapper' },
          { text: 'ct-list-item', link: '/ct-list-item/list-item' },
          { text: 'ct-lit', link: '/ct-lit/lit' },
          { text: 'ct-loading', link: '/ct-loading/loading' },
          { text: 'ct-loading-bar', link: '/ct-loading-bar/loading-bar' },
          { text: 'ct-loading-placeholder', link: '/ct-loading-placeholder/loading-placeholder' },
          { text: 'ct-menu', link: '/ct-menu/menu' },
          { text: 'ct-phone-input', link: '/ct-phone-input/phone-input' },
          { text: 'ct-promp', link: '/ct-promp/promp' },
          { text: 'ct-qr-tools', link: '/ct-qr-tools/qr-tools' },
          { text: 'ct-radio', link: '/ct-radio/radio' },
          { text: 'ct-router', link: '/ct-router/router' },
          { text: 'ct-scroll-threshold', link: '/ct-scroll-threshold/scroll-threshold' },
          { text: 'ct-select', link: '/ct-select/select' },
          { text: 'ct-select-dialog', link: '/ct-select-dialog/select-dialog' },
          { text: 'ct-select-item', link: '/ct-select-item/select-item' },
          { text: 'ct-snackbar', link: '/ct-snackbar/snackbar' },
          { text: 'ct-spinner', link: '/ct-spinner/spinner' },
          { text: 'ct-tab', link: '/ct-tab/tab' },
          { text: 'ct-tabs', link: '/ct-tabs/tabs' },
          { text: 'ct-textarea', link: '/ct-textarea/textarea' },
          { text: 'ct-textarea-autogrow', link: '/ct-textarea-autogrow/textarea-autogrow' },
          { text: 'ct-tooltip', link: '/ct-tooltip/tooltip' },
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
