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
