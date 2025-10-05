import { FFmpeg } from "@ffmpeg/ffmpeg";

function App() {
	const [loaded, setLoaded] = useState(false);
	const ffmpegRef = useRef(new FFmpeg());

	const load = async () => {
		const ffmpeg = ffmpegRef.current;
		const coreURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.js");
		const wasmURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.wasm");

		await ffmpeg.load({
			coreURL,
			wasmURL,
		});
		setLoaded(true);
	};

	return (
		<div className="p-4">
			{loaded ? (
				"Loaded"
			) : (
				<button
					className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
					type="button"
					onClick={load}
				>
					Load
				</button>
			)}
		</div>
	);
}

export default App;
