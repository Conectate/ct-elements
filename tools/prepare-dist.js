import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const rootDir = path.resolve(__dirname, "../");

console.log("Preparing dist directory for publication...");

if (!fs.existsSync(distDir)) {
	console.error("dist directory not found. Run build first.");
	process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf-8"));

// Helper to remove dist/ prefix
function updatePath(p) {
	if (typeof p === "string" && p.startsWith("./dist/")) {
		return "./" + p.substring(7);
	}
	return p;
}

// Update exports
if (packageJson.exports) {
	for (const key in packageJson.exports) {
		const value = packageJson.exports[key];
		if (typeof value === "string") {
			packageJson.exports[key] = updatePath(value);
		} else if (typeof value === "object") {
			for (const subKey in value) {
				// Handle nested conditions if any, though current structure is flat objects
				if (typeof value[subKey] === "string") {
					value[subKey] = updatePath(value[subKey]);
				}
			}
		}
	}
}

// Update main, module, types
if (packageJson.main) packageJson.main = updatePath(packageJson.main);
if (packageJson.module) packageJson.module = updatePath(packageJson.module);
if (packageJson.types) packageJson.types = updatePath(packageJson.types);
if (packageJson.typings) packageJson.typings = updatePath(packageJson.typings);

// Clean up
delete packageJson.scripts;
delete packageJson.devDependencies;
delete packageJson.files;

// Write to dist/package.json
fs.writeFileSync(path.join(distDir, "package.json"), JSON.stringify(packageJson, null, 4));

// Copy README and LICENSE
["README.md", "LICENSE", ".npmrc"].forEach(file => {
	const srcPath = path.join(rootDir, file);
	if (fs.existsSync(srcPath)) {
		fs.copyFileSync(srcPath, path.join(distDir, file));
	}
});

console.log("Success! dist/package.json created.");
console.log("You can now run: npm publish dist");
