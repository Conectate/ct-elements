import path from "path";

import { Plugin, defineConfig } from "vite";

function LitCSSLoader(): Plugin {
	return {
		name: "vite-css-plg",
		transform: function (code: string, id: string) {
			if (id.endsWith(".css")) {
				return `import {css} from 'lit'; console.log('cssloader!!');export const style = css\`${code}\`\n;export default style`;
			}
			return code;
		}
	};
}

// https://vitejs.dev/config/
export default (opts: any) => {
	let development = process.env.NODE_ENV != "production";
	return defineConfig({
		server: {
			port: 3080,
			host: "0.0.0.0"
		},
		resolve: {
			conditions: ["dev"],
			alias: [
				/**
				 * IMPORTANT:
				 * - These aliases must be exact matches (/$/) so they don't also match subpaths like:
				 *   "@conectate/components/ct-dialog/ct-loading.js"
				 */
				{ find: /^@conectate\/components\/ct-bottom-sheet$/, replacement: path.resolve(__dirname, "src/ct-bottom-sheet/ct-bottom-sheet.ts") },
				{ find: /^@conectate\/components\/ct-button$/, replacement: path.resolve(__dirname, "src/ct-button/ct-button.ts") },
				{ find: /^@conectate\/components\/ct-card$/, replacement: path.resolve(__dirname, "src/ct-card/ct-card.ts") },
				{ find: /^@conectate\/components\/ct-chartjs$/, replacement: path.resolve(__dirname, "src/ct-chartjs/ct-chartjs.ts") },
				{ find: /^@conectate\/components\/ct-checkbox$/, replacement: path.resolve(__dirname, "src/ct-checkbox/ct-checkbox.ts") },
				{ find: /^@conectate\/components\/ct-collapse$/, replacement: path.resolve(__dirname, "src/ct-collapse/ct-collapse.ts") },
				{ find: /^@conectate\/components\/ct-date$/, replacement: path.resolve(__dirname, "src/ct-date/ct-date.ts") },
				{ find: /^@conectate\/components\/ct-dialog$/, replacement: path.resolve(__dirname, "src/ct-dialog/ct-dialog.ts") },
				{ find: /^@conectate\/components\/ct-helpers$/, replacement: path.resolve(__dirname, "src/ct-helpers/ct-helpers.ts") },
				{ find: /^@conectate\/components\/ct-icon$/, replacement: path.resolve(__dirname, "src/ct-icon/ct-icon.ts") },
				{ find: /^@conectate\/components\/ct-img$/, replacement: path.resolve(__dirname, "src/ct-img/ct-img.ts") },
				{ find: /^@conectate\/components\/ct-input$/, replacement: path.resolve(__dirname, "src/ct-input/ct-input.ts") },
				{ find: /^@conectate\/components\/ct-list$/, replacement: path.resolve(__dirname, "src/ct-list/ct-list-item.ts") },
				{ find: /^@conectate\/components\/ct-lit$/, replacement: path.resolve(__dirname, "src/ct-lit/ct-lit.ts") },
				{ find: /^@conectate\/components\/ct-loading-bar$/, replacement: path.resolve(__dirname, "src/ct-loading-bar/ct-loading-bar.ts") },
				{ find: /^@conectate\/components\/ct-loading-placeholder$/, replacement: path.resolve(__dirname, "src/ct-loading-placeholder/ct-loading-placeholder.ts") },
				{ find: /^@conectate\/components\/ct-menu$/, replacement: path.resolve(__dirname, "src/ct-menu/ct-menu.ts") },
				{ find: /^@conectate\/components\/ct-phone-input$/, replacement: path.resolve(__dirname, "src/ct-phone-input/ct-phone-input.ts") },
				{ find: /^@conectate\/components\/ct-qr-tools$/, replacement: path.resolve(__dirname, "src/ct-qr-tools/ct-qr-tools.ts") },
				{ find: /^@conectate\/components\/ct-radio$/, replacement: path.resolve(__dirname, "src/ct-radio/ct-radio.ts") },
				{ find: /^@conectate\/components\/ct-router$/, replacement: path.resolve(__dirname, "src/ct-router/ct-router.ts") },
				{ find: /^@conectate\/components\/ct-scroll-threshold$/, replacement: path.resolve(__dirname, "src/ct-scroll-threshold/ct-scroll-threshold.ts") },
				{ find: /^@conectate\/components\/ct-select$/, replacement: path.resolve(__dirname, "src/ct-select/ct-select.ts") },
				{ find: /^@conectate\/components\/ct-snackbar$/, replacement: path.resolve(__dirname, "src/ct-snackbar/ct-snackbar.ts") },
				{ find: /^@conectate\/components\/ct-spinner$/, replacement: path.resolve(__dirname, "src/ct-spinner/ct-spinner.ts") },
				{ find: /^@conectate\/components\/ct-tabs$/, replacement: path.resolve(__dirname, "src/ct-tabs/ct-tabs.ts") },
				{ find: /^@conectate\/components\/ct-tooltip$/, replacement: path.resolve(__dirname, "src/ct-tooltip/ct-tooltip.ts") },
				{ find: /^@conectate\/components\/lit-if$/, replacement: path.resolve(__dirname, "src/lit-if/lit-if.ts") },
				// Subpaths importing compiled names with ".js" -> map to source ".ts"
				{ find: /^@conectate\/components\/(.+)\.js$/, replacement: path.resolve(__dirname, "src") + "/$1.ts" },
				// Subpaths importing without extension -> map to source ".ts"
				{ find: /^@conectate\/components\/(.+)$/, replacement: path.resolve(__dirname, "src") + "/$1.ts" }
			]
		},
		define: {
			"process.env.NODE_ENV": JSON.stringify(development ? "development" : "production")
		}
	});
};
