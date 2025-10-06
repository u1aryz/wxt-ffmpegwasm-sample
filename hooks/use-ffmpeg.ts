import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useRef } from "react";
import useAsync from "react-use/esm/useAsync";

type UseFFmpegReturnType = {
	loading: boolean;
	error: Error | null | undefined;
	ffmpeg: FFmpeg | null;
};

export function useFFmpeg(): UseFFmpegReturnType {
	const ffmpegRef = useRef(new FFmpeg());
	const { error, loading } = useAsync(async () => {
		const ffmpeg = ffmpegRef.current;
		const coreURL = browser.runtime.getURL("/ffmpeg/ffmpeg-core.js");
		const wasmURL = browser.runtime.getURL("/ffmpeg/ffmpeg-core.wasm");
		await ffmpeg.load({
			coreURL,
			wasmURL,
		});
	}, []);

	return { loading, error, ffmpeg: ffmpegRef.current };
}
