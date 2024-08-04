import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
	// eslint-disable-next-line no-undef
	const VITE_BUILD_DIR = process.env.VITE_BUILD_DIR;

	return {
		envDir: "../",
		plugins: [react()],
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"),
			},
		},
		build: {
			outDir: VITE_BUILD_DIR ?? "../dist",
			emptyOutDir: true,
		},
	};
});
