import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// WebGL in headless Chrome: "angle" works on most machines; use "swangle" (software) on servers without a GPU.
Config.setChromiumOpenGlRenderer(process.env.REMOTION_GL === "swangle" ? "swangle" : "angle");
// Optional: point at an existing Chrome/Chromium instead of letting Remotion download one.
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
