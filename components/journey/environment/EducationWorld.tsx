import { Shape } from "three";
import {
  Box,
  Blocks,
  Cylinder,
  Tree,
  Bench,
  SurfaceSign,
  palette as P,
  V3,
} from "./primitives";
const pediment = new Shape()
  .moveTo(-2.7, 0)
  .lineTo(2.7, 0)
  .lineTo(0, 1.15)
  .closePath();
const windows = [-8, -6, -4, -2, 0, 2, 4, 6, 8].flatMap((x) =>
  [1.6, 3.7, 5.8]
    .filter((y) => !(Math.abs(x) < 2 && y < 4) && !(Math.abs(x) > 5 && y > 5))
    .map((y) => ({ p: [x, y, 3.04] as V3, s: [0.72, 1.22, 0.12] as V3 })),
);
export default function EducationWorld() {
  return (
    <group position={[-20, 0, -26]}>
      {[-7, 7].map((x) => (
        <Box key={x} p={[x, -0.015, 2]} s={[8, 0.04, 20]} c="#879078" />
      ))}
      <Box p={[0, 0.018, 3]} s={[5, 0.025, 22]} c="#c7bea6" />
      <Box p={[0, 0.02, 4]} s={[23, 0.03, 3]} c="#c7bea6" />
      <group position={[0, 0, -5]}>
        {/* Three-storey central block, lower wings, flat cornice and narrow octagonal cupola. */}
        <Box p={[0, 3.6, 0]} s={[10, 7.2, 5.8]} c="#b1b3a6" />
        {[-7.4, 7.4].map((x) => (
          <group key={x}>
            <Box p={[x, 2.5, 0]} s={[4.8, 5, 5.8]} c="#b0b2a4" />
            <Box p={[x, 5.1, 0]} s={[5.1, 0.22, 6.1]} c="#d4d0bc" />
            <Box p={[x, 5.3, 0]} s={[4.9, 0.18, 6]} c={P.copper} />
          </group>
        ))}
        <Box p={[0, 7.25, 0]} s={[10.5, 0.26, 6.2]} c="#d5d0ba" />
        <Box p={[0, 7.48, 0]} s={[10.2, 0.16, 5.9]} c={P.copper} />
        <Blocks
          c="#e0d8c0"
          items={windows.map((v) => ({
            p: v.p,
            s: [v.s[0] + 0.18, v.s[1] + 0.2, 0.14],
          }))}
        />
        <Blocks
          c="#405a53"
          items={windows.map((v) => ({ ...v, p: [v.p[0], v.p[1], 3.14] }))}
        />
        <Blocks
          c="#c5c7b5"
          items={windows.map((v) => ({
            p: [v.p[0], v.p[1], 3.23],
            s: [0.05, 1.22, 0.04],
          }))}
        />
        <Blocks
          c="#8e968a"
          items={[0.8, 2.7, 4.8, 6.9].map((y) => ({
            p: [0, y, 3.02],
            s: [19.5, 0.055, 0.025],
          }))}
        />
        <Box p={[0, 1.55, 3.08]} s={[1.35, 3.1, 0.22]} c="#30453c" />
        {[-2.1, -0.9, 0.9, 2.1].map((x) => (
          <group key={x}>
            <Cylinder p={[x, 1.65, 4]} r={0.19} h={3.3} c="#d8d2bc" />
            <Box p={[x, 3.3, 4]} s={[0.5, 0.2, 0.5]} c="#e1d9c1" />
          </group>
        ))}
        <Box p={[0, 3.6, 3.65]} s={[5.4, 0.35, 2]} c="#d7cfb7" />
        <Box p={[0, 3.9, 4.45]} s={[5.1, 0.3, 0.18]} c="#b7b7a4" />
        <mesh position={[0, 7.25, 3.08]} castShadow>
          <extrudeGeometry
            args={[pediment, { depth: 0.2, bevelEnabled: false }]}
          />
          <meshStandardMaterial color="#c8c5b2" />
        </mesh>
        <Cylinder
          p={[0, 8.05, -0.2]}
          r={1.05}
          h={0.65}
          c="#646f62"
          vertices={8}
        />
        <Cylinder p={[0, 9, -0.2]} r={0.87} h={1.3} c="#b6b69f" vertices={8} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <Box
              key={i}
              p={[Math.sin(a) * 0.83, 9, Math.cos(a) * 0.83 - 0.2]}
              s={[0.4, 0.85, 0.06]}
              c="#354f49"
              rotation={[0, a, 0]}
            />
          );
        })}
        <Cylinder
          p={[0, 9.78, -0.2]}
          r={1.02}
          h={0.16}
          c="#c5bea7"
          vertices={8}
        />
        <mesh position={[0, 10.12, -0.2]} castShadow>
          <sphereGeometry args={[1.02, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#668777" flatShading />
        </mesh>
        <Cylinder p={[0, 11.25, -0.2]} r={0.035} h={1.8} c="#e6dbc1" />
        {/* Small McGill-inspired flag: white field and red heraldic emblem, not a downloaded logo. */}
        <Box p={[0.49, 11.7, -0.2]} s={[0.95, 0.5, 0.025]} c="#f3e8ce" />
        <Box p={[0.42, 11.7, -0.17]} s={[0.27, 0.31, 0.02]} c={P.red} />
        <Box p={[0.42, 11.77, -0.15]} s={[0.21, 0.055, 0.01]} c="#f3e8ce" />
        {[-3.7, 3.7].map((x) => (
          <Box key={x} p={[x, 2.2, 3.18]} s={[0.3, 2.5, 0.06]} c={P.red} />
        ))}
      </group>
      {[-8, 8].flatMap((x) =>
        [2, 10].map((z) => (
          <Tree key={`${x}-${z}`} p={[x, 0, z]} scale={0.85} />
        )),
      )}
      <Bench p={[-5, 0, 8]} />
      <Bench p={[5, 0, 8]} />
      <SurfaceSign
        text="01 / Education"
        sub="McGILL · MONTRÉAL"
        p={[0, 0.035, 12]}
        width={5}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
