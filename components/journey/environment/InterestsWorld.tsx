import {
  Box,
  Blocks,
  Cylinder,
  Beam,
  SurfaceSign,
  palette as P,
  V3,
} from "./primitives";
export default function InterestsWorld() {
  return (
    <group position={[23, 0, 9]}>
      <mesh position={[0, -0.013, 0]} receiveShadow>
        <cylinderGeometry args={[13, 13, 0.035, 32]} />
        <meshStandardMaterial color="#8d9881" roughness={0.9} />
      </mesh>
      {/* Faceted bouldering wall and generous flush landing mat. */}
      <Box
        p={[2, 3.25, -8]}
        s={[10, 6.5, 0.5]}
        c="#bba68c"
        rotation={[0, 0, 0]}
      />
      <Box
        p={[-1, 3.3, -7.74]}
        s={[3.8, 6.6, 0.05]}
        c="#cbbba0"
        rotation={[0, 0, 0]}
      />
      <Box p={[0, 0.035, -3.8]} s={[13, 0.06, 6]} c="#5a7064" />
      {Array.from({ length: 32 }, (_, i) => {
        const x = -2.6 + (i % 7) * 1.35,
          y = 0.8 + Math.floor(i / 7) * 1.13;
        return (
          <mesh
            key={i}
            position={[x, y, -7.62]}
            scale={[0.22 + (i % 3) * 0.06, 0.17, 0.18]}
            rotation={[0, i, 0.3]}
            castShadow
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={["#9d6449", "#5e7e72", "#d5bb7b", "#8b7358"][i % 4]}
            />
          </mesh>
        );
      })}
      <Beam a={[-3, 0, -9]} b={[-3, 6.5, -8]} width={0.2} />
      <Beam a={[7, 0, -9]} b={[7, 6.5, -8]} width={0.2} />
      <group position={[-3, 0, 3]}>
        <Cylinder p={[0, 0.55, 0]} r={0.3} h={1.1} c={P.metal} />
        <Box p={[0, 1.1, 0]} s={[2.4, 0.18, 2.4]} c={P.wood} />
        <Blocks
          c="#e0d1ae"
          items={Array.from({ length: 64 }, (_, i) => i)
            .filter((i) => (Math.floor(i / 8) + (i % 8)) % 2 === 0)
            .map((i) => ({
              p: [
                -0.875 + (i % 8) * 0.25,
                1.2,
                -0.875 + Math.floor(i / 8) * 0.25,
              ] as V3,
              s: [0.25, 0.025, 0.25] as V3,
            }))}
        />
        <Blocks
          c="#374c42"
          items={Array.from({ length: 64 }, (_, i) => i)
            .filter((i) => (Math.floor(i / 8) + (i % 8)) % 2 === 1)
            .map((i) => ({
              p: [
                -0.875 + (i % 8) * 0.25,
                1.2,
                -0.875 + Math.floor(i / 8) * 0.25,
              ] as V3,
              s: [0.25, 0.025, 0.25] as V3,
            }))}
        />
        {[-1, 1].flatMap((sign) =>
          Array.from({ length: 8 }, (_, i) => (
            <group
              key={`${sign}-${i}`}
              position={[-0.875 + i * 0.25, 1.24, sign * 0.625]}
            >
              <Cylinder
                p={[0, 0.08, 0]}
                r={0.065}
                h={0.16}
                c={sign === 1 ? "#e5d4ae" : "#34483e"}
                vertices={8}
              />
              <mesh position={[0, 0.19, 0]}>
                <sphereGeometry args={[0.07, 6, 5]} />
                <meshStandardMaterial
                  color={sign === 1 ? "#e5d4ae" : "#34483e"}
                />
              </mesh>
            </group>
          )),
        )}
      </group>
      {[
        [-5, 5],
        [-1, 1],
      ].map(([x, z], i) => (
        <group key={i}>
          <Box p={[x, 0.5, z]} s={[0.9, 0.16, 0.9]} c={P.wood} />
          <Box p={[x, 0.25, z]} s={[0.5, 0.5, 0.5]} c={P.metal} />
        </group>
      ))}
      <group position={[6, 0, 5]}>
        <Box p={[0, 0.45, 0]} s={[3, 0.9, 1.2]} c="#b0a98c" />
        <Cylinder p={[0, 1.1, 0]} r={0.28} h={0.45} c="#d6c4a0" />
        <mesh position={[0, 1.6, 0]}>
          <torusGeometry args={[0.4, 0.07, 6, 18]} />
          <meshStandardMaterial color="#ac8559" />
        </mesh>
      </group>
      <SurfaceSign
        text="04 / Off the clock"
        sub="CURIOSITY BEYOND THE DESK"
        p={[0, 0.035, 10]}
        width={6}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
