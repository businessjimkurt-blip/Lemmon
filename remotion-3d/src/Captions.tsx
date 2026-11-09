import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import { useMemo } from "react";
import captionsJson from "./captions.json";

// Word-level captions (same shape Whisper / @remotion/install-whisper-cpp produce).
const captions = captionsJson as Caption[];
const SWITCH_EVERY_MS = 1600; // how long a group of words stays together

export const Captions: React.FC = () => {
  const { fps } = useVideoConfig();
  const { pages } = useMemo(
    () => createTikTokStyleCaptions({ captions, combineTokensWithinMilliseconds: SWITCH_EVERY_MS }),
    [],
  );

  return (
    <AbsoluteFill>
      {pages.map((page, i) => {
        const next = pages[i + 1];
        const from = Math.round((page.startMs / 1000) * fps);
        const endMs = next ? next.startMs : page.startMs + page.durationMs;
        const dur = Math.max(1, Math.round(((endMs - page.startMs) / 1000) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <CaptionPage tokens={page.tokens} pageStartMs={page.startMs} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const CaptionPage: React.FC<{
  tokens: { text: string; fromMs: number; toMs: number }[];
  pageStartMs: number;
}> = ({ tokens, pageStartMs }) => {
  const frame = useCurrentFrame(); // relative to the Sequence
  const { fps } = useVideoConfig();
  const nowMs = pageStartMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: "12%" }}>
      <div
        style={{
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 84,
          color: "white",
          textAlign: "center",
          whiteSpace: "pre",
          textShadow: "0 6px 24px rgba(0,0,0,.6)",
          WebkitTextStroke: "2px rgba(0,0,0,.35)",
        }}
      >
        {tokens.map((t, i) => {
          const active = nowMs >= t.fromMs && nowMs < t.toMs;
          return (
            <span key={i} style={{ color: active ? "#ffd84f" : "white" }}>
              {t.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
