import { Composition } from "remotion";
import { Main, mainSchemaDefaults } from "./Main";

export const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Main"
      component={Main}
      durationInFrames={FPS * 8}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={mainSchemaDefaults}
    />
    {/* Vertical version for Shorts / Reels / TikTok */}
    <Composition
      id="MainVertical"
      component={Main}
      durationInFrames={FPS * 8}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={mainSchemaDefaults}
    />
  </>
);
