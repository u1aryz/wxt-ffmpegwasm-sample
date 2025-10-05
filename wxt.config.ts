import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	outDir: "output",
	vite: () => ({
		plugins: [tailwindcss()],
		optimizeDeps: {
			exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
		},
	}),
	manifest: {
		web_accessible_resources: [
			{
				resources: ["ffmpeg/*.js", "ffmpeg/*.wasm"],
				matches: ["<all_urls>"],
			},
		],
	},
});
