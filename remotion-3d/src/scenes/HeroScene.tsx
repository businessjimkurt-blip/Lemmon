import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

// Drive everything from `frame`, never from clocks or useFrame():
// Remotion renders frames out of order and in parallel, so animation must be a pure function of frame.
export const HeroScene: React.FC<{ accent: string }> = ({ accent }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const camera = useThree((s) => s.camera);

  // Camera dolly + slow orbit
  const t = frame / durationInFrames;
  const radius = interpolate(t, [0, 1], [9, 6]);
  const angle = interpolate(t, [0, 1], [-0.4, 0.4]);
  useEffect(() => {
    camera.position.set(Math.sin(angle) * radius, 1.2, Math.cos(angle) * radius);
    camera.lookAt(0, 0, 0);
  }, [camera, angle, radius]);

  const pop = spring({ frame, fps, config: { damping: 12 } });
  const spin = frame * 0.02;

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow />
      <pointLight position={[-4, -2, 3]} intensity={30} color={accent} />

      <mesh position={[0, 0.5, 0]} rotation={[spin * 0.6, spin, 0]} scale={pop * 1.2}>
        <torusKnotGeometry args={[1, 0.32, 220, 32]} />
        <meshStandardMaterial color={accent} metalness={0.6} roughness={0.25} />
      </mesh>

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color="#141a2b" roughness={0.9} />
      </mesh>
    </>
  );
};
