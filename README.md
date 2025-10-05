# WXT ffmpeg.wasm Sample

A sample browser extension demonstrating how to load and use [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) in a WXT-based browser extension.

## Features

- Browser extension built with [WXT](https://wxt.dev/)
- ffmpeg.wasm integration with proper web-accessible resources configuration
- React + TypeScript + Tailwind CSS
- Simple popup UI to load FFmpeg

## Installation

```bash
bun install
```

## Development

### Chrome/Chromium

```bash
bun run dev
```

### Firefox

```bash
bun run dev:firefox
```

The extension will be loaded in development mode with hot-reload enabled.

## Build

### Chrome/Chromium

```bash
bun run build
```

### Firefox

```bash
bun run build:firefox
```

Built extension will be output to the `output/` directory.

## Create Distribution Package

```bash
bun run zip
```

## Project Structure

```
wxt-ffmpegwasm-sample/
├── entrypoints/
│   ├── background.ts       # Background script
│   ├── content.ts          # Content script
│   └── popup/
│       ├── main.tsx        # Popup entry point
│       └── App.tsx         # Popup UI (FFmpeg loader)
├── public/                 # Static assets
├── wxt.config.ts           # WXT configuration
└── package.json
```

## Key Configuration

### WXT Config (`wxt.config.ts`)

The configuration includes important settings for ffmpeg.wasm:

- **Web Accessible Resources**: Exposes FFmpeg core files (`ffmpeg/*.js`, `ffmpeg/*.wasm`) to allow the extension to load them
- **Vite optimizeDeps**: Excludes `@ffmpeg/ffmpeg` and `@ffmpeg/util` from Vite's dependency optimization

### FFmpeg Loading (`entrypoints/popup/App.tsx`)

The sample demonstrates how to load FFmpeg using `chrome.runtime.getURL()` to access the bundled core files:

```typescript
const coreURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.js");
const wasmURL = chrome.runtime.getURL("/ffmpeg/ffmpeg-core.wasm");

await ffmpeg.load({
  coreURL,
  wasmURL,
});
```

## Tech Stack

- [WXT](https://wxt.dev/) - Browser extension framework
- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) - FFmpeg compiled to WebAssembly
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## License

MIT
