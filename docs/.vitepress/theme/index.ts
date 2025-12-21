import "./custom.css"; // Import your global CSS file

import { Theme } from "vitepress";
// .vitepress/theme/index.js (or index.ts)
import DefaultTheme from "vitepress/theme";

export default {
	extends: DefaultTheme
	// You can also register global components here if needed
	// enhanceApp({ app }) {
	//   app.component('MyGlobalComponent', MyGlobalComponent);
	// }
} satisfies Theme;
