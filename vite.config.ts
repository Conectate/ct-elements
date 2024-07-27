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
		// plugins: [LitCSSLoader()],
		resolve: {
			conditions: ["dev"]
		},
		define: {
			"process.env.NODE_ENV": JSON.stringify(development ? "development" : "production")
		}
	});
};
