import {
  Box,
  Blocks,
  Beam,
  Cylinder,
  Bench,
  SurfaceSign,
  palette as P,
  V3,
} from "./primitives";
const bays = [-44, -24, -4, 16, 36];
export default function Hangar() {
  return (
    <group>
      <Box p={[0, -0.22, -4]} s={[80, 0.44, 106]} c="#96998c" />
      <Box p={[-39, 12, -4]} s={[1, 24, 106]} c="#b0ad9b" />
      <Box p={[39, 12, -4]} s={[1, 24, 106]} c="#b0ad9b" />
      <Box p={[0, 5, -54]} s={[80, 10, 1]} c="#b8b3a0" />
      <Box p={[0, 5, 47]} s={[80, 10, 1]} c="#a6a694" />
      <Box p={[0, 24, -50]} s={[78, 0.25, 8]} c="#777f71" castShadow={false} />
      {[-1, 1].flatMap((sign) =>
        [-34, -14, 6, 26].map((z) => (
          <group key={`${sign}-${z}`}>
            <Box
              p={[sign * 38.45, 16, z]}
              s={[0.08, 8, 13]}
              c="#a8b7a3"
              castShadow={false}
            />
            {[-4, 0, 4].map((offset) => (
              <Box
                key={offset}
                p={[sign * 38.35, 16, z + offset]}
                s={[0.12, 8, 0.12]}
                c={P.metal}
              />
            ))}
          </group>
        )),
      )}
      {/* Long clerestory windows and a luminous glazed end wall frame the entire exhibition. */}
      <Box p={[0, 17, -54]} s={[78, 14, 0.35]} c="#b8c3b0" castShadow={false} />
      <Box p={[0, 17, 47]} s={[78, 14, 0.35]} c="#8b9d91" castShadow={false} />
      <Blocks
        c={P.metal}
        items={Array.from({ length: 17 }, (_, i) => ({
          p: [-38 + i * 4.75, 17, -53.7] as V3,
          s: [0.14, 14, 0.2] as V3,
        }))}
      />
      {[11, 17, 23].map((y) => (
        <Box key={y} p={[0, y, -53.6]} s={[79, 0.16, 0.25]} c={P.metal} />
      ))}
      {bays.map((z) => (
        <group key={z}>
          {[-36, 36].map((x) => (
            <group key={x}>
              <Box p={[x, 11.5, z]} s={[0.6, 23, 0.65]} c={P.metal} />
              <Box p={[x, 0.5, z]} s={[1.2, 1, 1.2]} c="#797f73" />
              <Beam
                a={[x, 18, z]}
                b={[x - Math.sign(x) * 5, 23, z]}
                width={0.25}
              />
            </group>
          ))}
          <Box p={[0, 23, z]} s={[73, 0.35, 0.4]} c={P.metal} />
          <Box p={[0, 20.8, z]} s={[73, 0.22, 0.25]} c={P.metal} />
          {Array.from({ length: 12 }, (_, i) => (
            <Beam
              key={i}
              a={[-36 + i * 6, 20.8, z]}
              b={[-30 + i * 6, 23, z]}
              width={0.12}
            />
          ))}
          {[-25, 25].map((x) => (
            <group key={x}>
              <Box
                p={[x, 23.7, z + 7]}
                s={[22, 0.3, 19]}
                c="#777f71"
                castShadow={false}
              />
              <Box
                p={[x, 12, z - 1]}
                s={[0.14, 0.2, 14]}
                c={P.cream}
                castShadow={false}
              />
              <Beam a={[x, 12, z - 1]} b={[x, 23, z - 1]} width={0.04} />
            </group>
          ))}
          <Box
            p={[0, 24, z + 7]}
            s={[27, 0.12, 19]}
            c="#d5dcc3"
            castShadow={false}
          />
          {[-13.5, -4.5, 4.5, 13.5].map((x) => (
            <Box key={x} p={[x, 23.8, z + 7]} s={[0.18, 0.3, 19]} c={P.metal} />
          ))}
        </group>
      ))}
      {/* Inlaid circulation strips and floor joints remain flat and walkable. */}
      <Blocks
        shadow={false}
        c="#747f74"
        items={Array.from({ length: 22 }, (_, i) => ({
          p: [0, 0.006, -52 + i * 4.5] as V3,
          s: [78, 0.012, 0.025] as V3,
        }))}
      />
      <Blocks
        shadow={false}
        c="#747f74"
        items={Array.from({ length: 17 }, (_, i) => ({
          p: [-38 + i * 4.75, 0.006, -4] as V3,
          s: [0.025, 0.012, 102] as V3,
        }))}
      />
      {[-7, 7].map((x) => (
        <Box key={x} p={[x, 0.015, -4]} s={[0.06, 0.018, 98]} c="#ddd0a9" />
      ))}
      {/* Warm skylight footprints; thin translucent surfaces avoid extra shadow maps. */}
      {[-34, -12, 10, 32].map((z) => (
        <mesh
          key={z}
          position={[-2, 0.025, z]}
          rotation={[-Math.PI / 2, 0, -0.28]}
        >
          <planeGeometry args={[19, 9]} />
          <meshBasicMaterial
            color="#f6dca6"
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </mesh>
      ))}
      <SurfaceSign
        text="THE JOURNEY"
        sub="FOUR WORLDS. ONE CONTINUOUS STORY."
        p={[0, 5.4, -53.4]}
        width={18}
      />
      {[-12, 12].map((x) => (
        <Bench key={x} p={[x, 0, 30]} rotation={Math.PI / 2} />
      ))}
      <group position={[0, 0, -43]}>
        <Cylinder p={[0, 0.15, 0]} r={2.8} h={0.3} c="#c3baa3" />
        <mesh position={[0, 3, 0]} rotation={[0.2, 0, 0.35]} castShadow>
          <torusGeometry args={[2, 0.15, 8, 32]} />
          <meshStandardMaterial
            color="#aa936c"
            metalness={0.65}
            roughness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
