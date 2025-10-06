import { resolve } from "node:path";
import { defineWxtModule } from "wxt/modules";

export default defineWxtModule((wxt) => {
	const jsPath = "ffmpeg/ffmpeg-core.js";
	const wasmPath = "ffmpeg/ffmpeg-core.wasm";

	wxt.hook("prepare:publicPaths", (_, paths) => {
		paths.push(jsPath);
		paths.push(wasmPath);
	});

	wxt.hook("build:publicAssets", (_, assets) => {
		assets.push({
			absoluteSrc: resolve("node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.js"),
			relativeDest: jsPath,
		});
		assets.push({
			absoluteSrc: resolve(
				"node_modules/@ffmpeg/core/dist/esm/ffmpeg-core.wasm",
			),
			relativeDest: wasmPath,
		});
	});
});
