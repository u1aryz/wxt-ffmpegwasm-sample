function App() {
	const [messages, setMessages] = useState<string[]>([]);
	const { error, loading, ffmpeg } = useFFmpeg();

	useEffect(() => {
		if (loading || !ffmpeg) {
			return;
		}
		ffmpeg.on("log", ({ message, type }) => {
			if (type === "stdout") {
				setMessages((prevMessages) => [...prevMessages, message]);
			}
		});
	}, [ffmpeg, loading]);

	const handleClick = async () => {
		ffmpeg?.exec(["-version"]);
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
					onClick={handleClick}
				>
					Display ffmpeg version
				</button>
			)}
			{error && <p className="text-red-500">{error.message}</p>}
		</div>
	);
}

export default App;
