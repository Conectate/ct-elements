import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../");
const srcDir = path.resolve(rootDir, "src");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf-8"));
const exports = packageJson.exports || {};

// Read files from src directory
const srcFiles = fs.readdirSync(srcDir).filter(file => file.endsWith(".ts") && !file.endsWith(".d.ts") && !file.endsWith(".stories.ts") && !file.endsWith(".test.ts"));

const missingExports = [];
const extraExports = [];

// Check for missing exports (files in src but not in package.json)
srcFiles.forEach(file => {
	const name = path.basename(file, ".ts");
	// We check for the explicit export key (e.g. "./ct-button")
	// We ignore the wildcard exports "./*" and "./*.js" for this check
	const exportKey = `./${name}`;

	if (!exports[exportKey]) {
		missingExports.push({ file, exportKey });

		// Add the missing export
		exports[exportKey] = {
			types: `./${name}.d.ts`,
			import: `./${name}.js`,
			default: `./${name}.js`
		};
	}
});

if (missingExports.length > 0) {
	console.log("⚠️  Added the following missing exports to package.json:");
	missingExports.forEach(({ file, exportKey }) => {
		console.log(`   + src/${file}  ->  "${exportKey}"`);
	});

	// Sort exports alphabetically for consistency
	const sortedExports = Object.keys(exports)
		.sort((a, b) => {
			// Keep wildcards at the bottom
			if (a.includes("*") && !b.includes("*")) return 1;
			if (!a.includes("*") && b.includes("*")) return -1;
			return a.localeCompare(b);
		})
		.reduce((obj, key) => {
			obj[key] = exports[key];
			return obj;
		}, {});

	packageJson.exports = sortedExports;

	// Write updated package.json
	fs.writeFileSync(path.join(rootDir, "package.json"), JSON.stringify(packageJson, null, 4));
	console.log("\n✅ package.json updated successfully.");
} else {
	console.log("✅ All src files are already explicitly exported in package.json.");
}
