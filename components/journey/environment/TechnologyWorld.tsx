import { Float } from "@react-three/drei";
import { Box, Blocks, Beam, SurfaceSign, palette as P, V3 } from "./primitives";
function Desk({ p, rotation = 0 }: { p: V3; rotation?: number }) {
  return (
    <group position={p} rotation={[0, rotation, 0]}>
      <Box p={[0, 1, 0]} s={[8, 0.15, 1.5]} c="#b8b5a3" />
      {[-3.5, 3.5].map((x) => (
        <Box key={x} p={[x, 0.5, 0]} s={[0.14, 1, 0.9]} c={P.metal} />
      ))}
      {[-2.5, 0, 2.5].map((x) => (
        <group key={x}>
          <Box p={[x, 1.55, -0.25]} s={[1.3, 0.8, 0.1]} c={P.dark} />
          <Box p={[x, 1.57, -0.18]} s={[1.14, 0.63, 0.03]} c="#73988e" />
          <Box p={[x, 1.14, -0.25]} s={[0.1, 0.4, 0.12]} c={P.dark} />
          <Box p={[x, 1.1, 0.38]} s={[0.8, 0.04, 0.3]} c="#40554c" />
          {[-0.17, 0, 0.17].map((y, i) => (
            <Box
              key={i}
              p={[x - 0.15, 1.57 + y, -0.16]}
              s={[0.55 - i * 0.12, 0.025, 0.01]}
              c="#c9dac4"
            />
          ))}
        </group>
      ))}
    </group>
  );
}
export default function TechnologyWorld({
  near,
  reduced,
}: {
  near: boolean;
  reduced: boolean;
}) {
  return (
    <group position={[22, 0, -24]}>
      <mesh position={[0, -0.013, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14, 0.035, 6]} />
        <meshStandardMaterial color="#657b73" roughness={0.55} />
      </mesh>
      {/* Asymmetric open gantry, with no walls across the visitor's route. */}
      {[-11, 11].map((x) => (
        <Box key={x} p={[x, 4, -9]} s={[0.24, 8, 0.24]} c={P.metal} />
      ))}
      <Box p={[0, 8, -9]} s={[22, 0.25, 0.3]} c={P.metal} />
      <Box p={[0, 7.8, -8.8]} s={[21, 0.08, 0.08]} c="#d2e0c7" />
      <Beam a={[11, 8, -9]} b={[11, 8, 7]} width={0.2} />
      <Box p={[11, 4, 7]} s={[0.25, 8, 0.25]} c={P.metal} />
      <Desk p={[-4, 0, -4]} />
      <Desk p={[6, 0, 2]} rotation={Math.PI / 2} />
      {[2, 4, 6].map((x) => (
        <group key={x}>
          <Box p={[x, 2.15, -8]} s={[1.5, 4.3, 1.6]} c="#344b43" />
          <Blocks
            c="#769085"
            items={Array.from({ length: 12 }, (_, i) => ({
              p: [x, 0.4 + i * 0.3, -7.17],
              s: [1.2, 0.1, 0.04],
            }))}
          />
          <Box p={[x + 0.48, 2.3, -7.12]} s={[0.04, 3.7, 0.02]} c="#c7d2a6" />
        </group>
      ))}
      <group position={[-7, 0, 5]}>
        <Box p={[0, 0.55, 0]} s={[1.2, 1.1, 1.2]} c="#c2bca8" />
        <Float
          enabled={!reduced}
          speed={1.5}
          floatIntensity={0.15}
          rotationIntensity={0.2}
        >
          <mesh position={[0, 1.65, 0]} rotation={[0.2, 0.4, 0.1]} castShadow>
            <octahedronGeometry args={[0.55]} />
            <meshStandardMaterial
              color="#c79b50"
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
        {near && (
          <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.08, 32]} />
            <meshBasicMaterial color="#efd39b" />
          </mesh>
        )}
      </group>
      <group position={[-3, 0, 6]}>
        <Box p={[0, 0.6, 0]} s={[1.5, 1.2, 1.5]} c="#b1b5a2" />
        <mesh position={[0, 1.6, 0]} rotation={[0.4, 0.2, 0]} castShadow>
          <torusKnotGeometry args={[0.38, 0.08, 40, 6]} />
          <meshStandardMaterial
            color="#97a898"
            metalness={0.4}
            roughness={0.4}
          />
        </mesh>
      </group>
      <SurfaceSign
        text="02 / Technology"
        sub="PROJECTS · PROTOTYPES · RESEARCH"
        p={[0, 0.035, 10]}
        width={6}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
