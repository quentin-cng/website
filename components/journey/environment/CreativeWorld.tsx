import {
  Box,
  Blocks,
  Beam,
  Cylinder,
  SurfaceSign,
  palette as P,
  V3,
} from "./primitives";
function Easel({ p, rotation = 0 }: { p: V3; rotation?: number }) {
  return (
    <group position={p} rotation={[0, rotation, 0]}>
      <Beam a={[-0.65, 0, 0.4]} b={[-0.3, 3, -0.1]} width={0.08} c={P.wood} />
      <Beam a={[0.65, 0, 0.4]} b={[0.3, 3, -0.1]} width={0.08} c={P.wood} />
      <Beam a={[0, 2.4, 0]} b={[0, 0, -0.9]} width={0.08} c={P.wood} />
      <Box p={[0, 1.85, 0.1]} s={[1.55, 1.85, 0.1]} c="#eee3c9" />
      <Box p={[0, 0.9, 0.18]} s={[1.85, 0.12, 0.3]} c={P.wood} />
    </group>
  );
}
export default function CreativeWorld() {
  return (
    <group position={[-22, 0, 9]}>
      <Box p={[0, -0.012, 0]} s={[23, 0.035, 21]} c="#ad9472" />
      <Blocks
        shadow={false}
        c="#937b5d"
        items={Array.from({ length: 28 }, (_, i) => ({
          p: [-11 + i * 0.8, 0.011, 0],
          s: [0.022, 0.008, 21],
        }))}
      />
      <Box p={[-5, 2.5, -4]} s={[0.5, 5, 9]} c="#bd9e7f" />
      {[-6, -2, 2].map((z) => (
        <group key={z}>
          <Box p={[-4.72, 2.8, z]} s={[0.12, 2.5, 2.5]} c="#514f40" />
          <Box p={[-4.63, 2.8, z]} s={[0.04, 2.25, 2.25]} c="#ede1c7" />
        </group>
      ))}
      <Easel p={[2, 0, -1]} rotation={-0.35} />
      <Easel p={[-1, 0, 4]} rotation={0.3} />
      <Easel p={[-7, 0, 5]} rotation={0.5} />
      <group position={[2, 0, -6]}>
        <Box p={[0, 1, 0]} s={[5, 0.17, 1.5]} c={P.wood} />
        {[-2, 2].map((x) => (
          <Box key={x} p={[x, 0.5, 0]} s={[0.13, 1, 1.1]} c={P.metal} />
        ))}
        {[-1.8, -1.4, -1].map((x) => (
          <Cylinder key={x} p={[x, 1.3, 0]} r={0.14} h={0.45} c="#d8c4a3" />
        ))}
        <Box p={[0.8, 1.13, 0]} s={[1.8, 0.08, 0.8]} c="#d8cbb0" />
      </group>
      <group position={[8, 0, -1]}>
        <Box p={[0, 0.7, 0]} s={[1.5, 1.4, 1.5]} c="#c8bea5" />
        <mesh position={[0, 2.15, 0]} rotation={[0.2, 0.1, 0.4]} castShadow>
          <torusGeometry args={[0.65, 0.18, 6, 18]} />
          <meshStandardMaterial color="#9c7358" roughness={0.65} />
        </mesh>
      </group>
      {[-9, 9].map((x) => (
        <Box key={x} p={[x, 3.6, -8]} s={[0.15, 7.2, 0.15]} c={P.metal} />
      ))}
      <Box p={[0, 7.2, -8]} s={[18, 0.2, 0.2]} c={P.metal} />
      {[-5, 0, 5].map((x) => (
        <group key={x}>
          <Cylinder p={[x, 6.95, -8]} r={0.2} h={0.45} c={P.metal} />
          <mesh position={[x, 6.69, -8]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.16, 12]} />
            <meshBasicMaterial color="#ffe2aa" />
          </mesh>
        </group>
      ))}
      <SurfaceSign
        text="03 / The studio"
        sub="A SPACE FOR CREATIVE WORK"
        p={[0, 0.035, 10]}
        width={6}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
