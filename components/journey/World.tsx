import { Shape } from "three";
import { Float } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
export const obstacles = [
  { x: 0, z: -13, w: 17, d: 7 },
  { x: 15, z: -7, w: 7, d: 10 },
  { x: -12, z: -7, w: 5, d: 8 },
  { x: 0, z: 0, w: 4.7, d: 4.7 },
];
function Box({
  p,
  s,
  c,
  ...props
}: {
  p: [number, number, number];
  s: [number, number, number];
  c: string;
} & ThreeElements["mesh"]) {
  return (
    <mesh position={p} castShadow receiveShadow {...props}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={c} roughness={0.85} />
    </mesh>
  );
}
function Tree({
  x,
  z,
  size = 1,
  tone = 0,
}: {
  x: number;
  z: number;
  size?: number;
  tone?: number;
}) {
  return (
    <group position={[x, 0, z]} scale={size}>
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 2.8, 6]} />
        <meshStandardMaterial color="#655345" />
      </mesh>
      {[
        [0, 3.6, 0, 1.65],
        [-0.7, 3, 0.2, 1.1],
        [0.7, 3.2, 0.1, 1.2],
      ].map(([a, b, c, r], i) => (
        <mesh key={i} position={[a, b, c]} castShadow>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial
            color={["#b9a55e", "#bd7549", "#637f65"][tone]}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
function Bench({
  x,
  z,
  rotation = 0,
}: {
  x: number;
  z: number;
  rotation?: number;
}) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      {[-0.22, 0, 0.22].map((v) => (
        <Box key={v} p={[0, 0.65, v]} s={[2, 0.12, 0.16]} c="#8f6548" />
      ))}
      <Box p={[0, 1.12, -0.3]} s={[2, 0.55, 0.1]} c="#8f6548" />
      {[-0.75, 0.75].map((v) => (
        <Box key={v} p={[v, 0.32, 0]} s={[0.12, 0.65, 0.65]} c="#454d46" />
      ))}
    </group>
  );
}
function Lamp({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.65, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.09, 3.3, 8]} />
        <meshStandardMaterial color="#444d48" />
      </mesh>
      <Box p={[0, 3.4, 0]} s={[0.35, 0.48, 0.35]} c="#ead7a4" />
      <mesh position={[0, 3.7, 0]}>
        <coneGeometry args={[0.34, 0.24, 4]} />
        <meshStandardMaterial color="#444d48" />
      </mesh>
    </group>
  );
}
const pediment = new Shape()
  .moveTo(-2.4, 0)
  .lineTo(2.4, 0)
  .lineTo(0, 1.25)
  .closePath();
function ArtsBuilding() {
  return (
    <group position={[0, 0, -13]}>
      <Box p={[0, 2.6, 0]} s={[17, 5.2, 6]} c="#bcae93" />
      <Box p={[0, 0.3, 0.1]} s={[17.5, 0.6, 6.4]} c="#cfc4aa" />
      <Box p={[0, 5.25, 0]} s={[17.5, 0.3, 6.5]} c="#e3d3b4" />
      {[-1, 1].map((sign) => (
        <Box
          key={sign}
          p={[0, 6.05, sign * 1.65]}
          s={[17.7, 0.22, 3.7]}
          c="#5d7771"
          rotation={[sign * 0.45, 0, 0]}
        />
      ))}
      {[-7, -5, -3, 3, 5, 7].flatMap((x) =>
        [1.7, 3.8].map((y) => (
          <group key={`${x}-${y}`}>
            <Box p={[x, y, 3.04]} s={[0.88, 1.3, 0.12]} c="#e5d7b9" />
            <Box p={[x, y, 3.12]} s={[0.64, 1.08, 0.08]} c="#435b60" />
            <Box p={[x, y, 3.18]} s={[0.055, 1.08, 0.04]} c="#b9bbaa" />
          </group>
        )),
      )}
      <Box p={[0, 1.5, 3.1]} s={[1.7, 3, 0.2]} c="#354947" />
      {[-1.8, 1.8].map((x) => (
        <mesh key={x} position={[x, 2.3, 4]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 4.5, 12]} />
          <meshStandardMaterial color="#e4d8bd" />
        </mesh>
      ))}
      <Box p={[0, 4.65, 3.7]} s={[4.8, 0.35, 2.4]} c="#ded1b2" />
      <mesh position={[0, 4.84, 4.8]} castShadow>
        <extrudeGeometry
          args={[pediment, { depth: 0.25, bevelEnabled: false }]}
        />
        <meshStandardMaterial color="#d5c5a6" />
      </mesh>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          p={[0, 0.12 + i * 0.14, 4.6 - i * 0.3]}
          s={[5 - i * 0.3, 0.24 + i * 0.28, 1.4]}
          c="#cfbea0"
        />
      ))}
      <mesh position={[0, 7.2, 0]} castShadow>
        <cylinderGeometry args={[0.95, 1.05, 1.5, 8]} />
        <meshStandardMaterial color="#dfceb1" />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <Box key={x} p={[x, 7.3, 0.8]} s={[0.3, 0.8, 0.1]} c="#455e59" />
      ))}
      <mesh position={[0, 8.35, 0]} castShadow>
        <coneGeometry args={[1.35, 1.2, 8]} />
        <meshStandardMaterial color="#58746c" />
      </mesh>
      <mesh position={[0, 9.12, 0]}>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial color="#d1b36d" />
      </mesh>
    </group>
  );
}
export default function World({
  near,
  reduced,
}: {
  near: boolean;
  reduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#c5c5ad"]} />
      <fog attach="fog" args={["#c5c5ad", 32, 92]} />
      <hemisphereLight args={["#fff1d2", "#77846a", 1.8]} />
      <directionalLight
        position={[-18, 27, 12]}
        intensity={3.2}
        color="#ffdfa6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-normalBias={0.04}
        shadow-radius={4}
      />
      <Box p={[0, -0.25, 0]} s={[180, 0.5, 180]} c="#879078" />
      <Box p={[0, -0.06, 0]} s={[17, 0.15, 23]} c="#c4b89c" />
      <Box p={[0, -0.035, 10]} s={[42, 0.12, 3.5]} c="#cdbfa2" />
      <Box p={[0, -0.035, -4]} s={[40, 0.12, 3.5]} c="#cdbfa2" />
      {[-7.9, 7.9].map((x) => (
        <Box key={x} p={[x, 0.025, 1]} s={[0.1, 0.025, 19]} c="#e2d4b4" />
      ))}
      {[-9.4, 9.4].flatMap((x) =>
        [0, 8].map((z) => (
          <group key={`${x}-${z}`}>
            <Box p={[x, 0.25, z]} s={[1.5, 0.5, 3.6]} c="#b4a78c" />
            <Box p={[x, 0.52, z]} s={[1.2, 0.1, 3.3]} c="#655d41" />
            {[-1, 0, 1].map((a) => (
              <mesh key={a} position={[x, 0.85, z + a]} castShadow>
                <icosahedronGeometry args={[0.65, 1]} />
                <meshStandardMaterial color="#708362" flatShading />
              </mesh>
            ))}
          </group>
        )),
      )}
      <ArtsBuilding />
      <group position={[15, 0, -7]}>
        <Box p={[0, 2.2, 0]} s={[7, 4.4, 10]} c="#6f8179" />
        <Box p={[-3.54, 2.4, 0]} s={[0.1, 3, 8.6]} c="#708c8b" />
        {[-3, -1, 1, 3].map((z) => (
          <Box key={z} p={[-3.64, 2.4, z]} s={[0.16, 3.3, 0.12]} c="#c7bc9f" />
        ))}
        <Box p={[0, 4.5, 0]} s={[7.6, 0.3, 10.6]} c="#b5ae96" />
        <Box p={[0, 2.4, 5.05]} s={[5.8, 2.9, 0.1]} c="#455f61" />
      </group>
      <group position={[-12, 0, -7]}>
        <Box p={[0, 1.7, 0]} s={[5, 3.4, 8]} c="#ab9b82" />
        <Box p={[0, 3.5, 0]} s={[5.5, 0.3, 8.5]} c="#566b60" />
        {[-2, 0, 2].map((z) => (
          <Box key={z} p={[2.55, 1.8, z]} s={[0.1, 1.5, 1]} c="#435b57" />
        ))}
      </group>
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.5, 32]} />
        <meshStandardMaterial color="#b5a486" />
      </mesh>
      <mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.15, 32]} />
        <meshStandardMaterial
          color="#718b85"
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.6, 1, 8]} />
        <meshStandardMaterial color="#c6b79a" />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.55, 8, 6]} />
        <meshStandardMaterial color="#9eaa90" flatShading />
      </mesh>
      <group position={[4, 0, 4]}>
        <Box p={[0, 0.55, 0]} s={[0.9, 1.1, 0.9]} c="#a89e85" />
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
          <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1, 1.08, 32]} />
            <meshBasicMaterial color="#efd39b" />
          </mesh>
        )}
      </group>
      {[
        [-10, 5],
        [-12, 12],
        [11, 6],
        [13, 13],
        [-20, -5],
        [23, -12],
        [-22, -20],
        [22, 3],
        [-10, -19],
        [11, -20],
        [-19, 15],
        [21, 19],
        [-26, 4],
      ].map(([x, z], i) => (
        <Tree key={i} x={x} z={z} size={0.9 + (i % 3) * 0.18} tone={i % 3} />
      ))}
      {[-5.5, 5.5].flatMap((x) =>
        [-5, 6].map((z) => (
          <Bench
            key={`${x}-${z}`}
            x={x}
            z={z}
            rotation={x < 0 ? Math.PI / 2 : -Math.PI / 2}
          />
        )),
      )}
      {[-7, 7].flatMap((x) =>
        [-7, 8].map((z) => <Lamp key={`${x}-${z}`} x={x} z={z} />),
      )}
      {[-1, 1].flatMap((sign) =>
        Array.from({ length: 9 }, (_, i) => (
          <group key={`${sign}-${i}`}>
            <Tree
              x={sign * (25 + (i % 3) * 4)}
              z={-35 + i * 8}
              size={1.5}
              tone={2}
            />
            <Box
              p={[sign * (40 + (i % 2) * 8), 3 + (i % 3), -25 + i * 9]}
              s={[7, 6 + (i % 3) * 2, 6]}
              c="#9da593"
            />
          </group>
        )),
      )}
      <mesh position={[0, -2, -66]} scale={[60, 15, 16]}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#8e9c87" flatShading />
      </mesh>
    </>
  );
}
