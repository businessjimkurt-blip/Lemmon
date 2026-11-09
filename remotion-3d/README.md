# remotion-3d

Starter for 3D animated videos: **Three.js** (through `@react-three/fiber` and `@remotion/three`) for the 3D, **Remotion** for captions and rendering to MP4.

## Install

Needs Node 20+ (ffmpeg is bundled with Remotion).

```bash
cd remotion-3d
npm install
```

## Use

```bash
npm run studio          # live preview + timeline in the browser (http://localhost:3000)
npm run render          # -> out/video.mp4 (1920x1080, 30 fps)
npx remotion render MainVertical out/vertical.mp4   # 1080x1920 for Shorts/Reels
npm run still           # -> out/still.png (one frame, quick check)
```

On a server with no GPU, or where Remotion can't download its own Chrome, set:

```bash
export REMOTION_GL=swangle                       # software WebGL
export REMOTION_BROWSER=/path/to/chrome-headless-shell   # use an existing Chrome
```

## Files

| File | What it does |
|---|---|
| `src/Root.tsx` | Compositions: size, fps, length (`Main` 16:9, `MainVertical` 9:16) |
| `src/Main.tsx` | Layers the 3D canvas and the captions |
| `src/scenes/HeroScene.tsx` | The 3D scene: lights, meshes, camera move |
| `src/Captions.tsx` | Word-by-word highlighted captions (`@remotion/captions`) |
| `src/captions.json` | The caption words with start/end times in ms |
| `remotion.config.ts` | Render settings (GL backend, browser path) |

## Rules that keep 3D renders correct

- **Animate from `useCurrentFrame()` only.** Not `useFrame()`, `Date.now()` or `Math.random()` without a seed: Remotion renders frames in parallel and out of order.
- Use `<ThreeCanvas>` from `@remotion/three`, not R3F's `<Canvas>`, so the scene follows Remotion's clock.
- Load models/textures with `staticFile()` from `public/` (e.g. `useGLTF(staticFile("model.glb"))` from `@react-three/drei`), and wrap async loads with `delayRender`/`continueRender` if not using Suspense.

## Captions from a voice-over

Put the audio in `public/`, add `<Audio src={staticFile("voice.mp3")} />` in `Main.tsx`, and generate word timings with Whisper:

```bash
npm install @remotion/install-whisper-cpp
```

Its `toCaptions()` output has the same shape as `src/captions.json`. You can also convert an `.srt` with `parseSrt()` from `@remotion/captions`.

Remotion is free for individuals and small companies; larger companies need a licence (see remotion.dev/license).
