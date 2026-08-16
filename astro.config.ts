import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	site: "https://brick-inc-tools.alessrodrgz.dev",
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(root, "src"),
			},
		},
		server: {
			allowedHosts: ["2d9e-194-220-112-140.ngrok-free.app"],
		},
	},
});
