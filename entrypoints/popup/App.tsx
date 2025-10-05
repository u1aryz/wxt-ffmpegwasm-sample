import { FFmpeg } from "@ffmpeg/ffmpeg";

function App() {
	const [messages, setMessages] = useState<string[]>([]);
	const ffmpegRef = useRef(new FFmpeg());

	const load = async () => {
		const ffmpeg = ffmpegRef.current;
		const coreURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.js");
		const wasmURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.wasm");

		ffmpeg.on("log", ({ message, type }) => {
			if (type === "stdout") {
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});
		await ffmpeg.load({
			coreURL,
			wasmURL,
		});

		await ffmpeg.exec(["-version"]);
	};

	return (
		<div className="p-4">
			{messages.length > 0 ? (
				<div>
					<h3 className="font-bold text-lg">Loaded</h3>
					{messages.map((message, index) => (
						<p key={index}>{message}</p>
					))}
				</div>
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
