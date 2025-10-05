import { resolve } from "node:path";
import { defineWxtModule } from "wxt/modules";

export default defineWxtModule((wxt) => {
	wxt.hook("build:publicAssets", (_, assets) => {
		assets.push({
			absoluteSrc: resolve("node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js"),
			relativeDest: "ffmpeg/ffmpeg-core.js",
		});
		assets.push({
			absoluteSrc: resolve(
				"node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm",
			),
			relativeDest: "ffmpeg/ffmpeg-core.wasm",
		});
	});
});
