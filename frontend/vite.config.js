import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path'

export default defineConfig({
	envDir: "../",
	plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
