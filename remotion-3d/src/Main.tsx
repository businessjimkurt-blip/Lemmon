import { AbsoluteFill, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { HeroScene } from "./scenes/HeroScene";
import { Captions } from "./Captions";

export const mainSchemaDefaults = {
  background: "#0b0f1a",
  accent: "#4f8cff",
};

type Props = typeof mainSchemaDefaults;

export const Main: React.FC<Props> = ({ background, accent }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: background }}>
      {/* ThreeCanvas = react-three-fiber Canvas synced to Remotion's frame clock */}
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 40, position: [0, 0, 8] }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <HeroScene accent={accent} />
      </ThreeCanvas>
      <Captions />
    </AbsoluteFill>
  );
};
