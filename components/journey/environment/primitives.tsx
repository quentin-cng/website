import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
export type V3 = [number, number, number];
export const palette = {
  stone: "#bcb8a7",
  light: "#ddd5bf",
  concrete: "#8e9388",
  dark: "#293b38",
  metal: "#394a46",
  wood: "#9e7050",
  copper: "#66867d",
  glass: "#54706b",
  cream: "#f1dfb8",
  red: "#a84136",
};
const cube = new THREE.BoxGeometry(1, 1, 1);
const mats = new Map<string, THREE.MeshStandardMaterial>();
function material(color: string) {
  if (!mats.has(color))
    mats.set(
      color,
      new THREE.MeshStandardMaterial({
        color,
        roughness:
          color === "#96998c" ? 0.35 : color === palette.metal ? 0.5 : 0.8,
        metalness: color === "#96998c" ? 0.12 : 0,
      }),
    );
  return mats.get(color)!;
}
export function Box({
  p,
  s,
  c = palette.stone,
  ...props
}: { p: V3; s: V3; c?: string } & ThreeElements["mesh"]) {
  return (
    <mesh
      geometry={cube}
      material={material(c)}
      position={p}
      scale={s}
      castShadow
      receiveShadow
      {...props}
    />
  );
}
export function Blocks({
  items,
  c,
  shadow = true,
}: {
  items: { p: V3; s: V3; rotation?: V3 }[];
  c: string;
  shadow?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    items.forEach(({ p, s, rotation }, i) => {
      dummy.position.set(...p);
      dummy.scale.set(...s);
      dummy.rotation.set(...(rotation ?? [0, 0, 0]));
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current!.instanceMatrix.needsUpdate = true;
    ref.current!.computeBoundingSphere();
  }, [items]);
  return (
    <instancedMesh
      ref={ref}
      args={[cube, material(c), items.length]}
      castShadow={shadow}
      receiveShadow
    />
  );
}
export function Cylinder({
  p,
  r = 0.2,
  h = 1,
  c = palette.metal,
  vertices = 12,
}: {
  p: V3;
  r?: number;
  h?: number;
  c?: string;
  vertices?: number;
}) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <cylinderGeometry args={[r, r, h, vertices]} />
      <meshStandardMaterial color={c} roughness={0.7} />
    </mesh>
  );
}
export function Beam({
  a,
  b,
  width = 0.16,
  c = palette.metal,
}: {
  a: V3;
  b: V3;
  width?: number;
  c?: string;
}) {
  const from = new THREE.Vector3(...a),
    to = new THREE.Vector3(...b);
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    to.clone().sub(from).normalize(),
  );
  return (
    <Box
      p={from.add(to).multiplyScalar(0.5).toArray() as V3}
      s={[
        width,
        new THREE.Vector3(...a).distanceTo(new THREE.Vector3(...b)),
        width,
      ]}
      quaternion={q}
      c={c}
    />
  );
}
export function SurfaceSign({
  text,
  sub = "",
  p,
  width = 4,
  rotation = [0, 0, 0],
}: {
  text: string;
  sub?: string;
  p: V3;
  width?: number;
  rotation?: V3;
}) {
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#293b38";
    ctx.fillRect(0, 0, 1024, 256);
    ctx.fillStyle = "#dfd5ba";
    ctx.font = "56px Georgia";
    ctx.fillText(text, 50, 110);
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "#b4b7a2";
    ctx.fillText(sub, 52, 180);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [text, sub]);
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <mesh position={p} rotation={rotation}>
      <planeGeometry args={[width, width / 4]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}
export function Tree({ p, scale = 1 }: { p: V3; scale?: number }) {
  return (
    <group position={p} scale={scale}>
      <Cylinder p={[0, 1.2, 0]} r={0.16} h={2.4} c="#6e6551" />
      {[
        [0, 3, 0, 1.2],
        [-0.6, 2.5, 0, 0.9],
        [0.6, 2.6, 0.2, 0.8],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial
            color={i === 1 ? "#9b9f70" : "#74876b"}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}
export function Bench({ p, rotation = 0 }: { p: V3; rotation?: number }) {
  return (
    <group position={p} rotation={[0, rotation, 0]}>
      <Box p={[0, 0.55, 0]} s={[3, 0.18, 0.85]} c={palette.wood} />
      {[-1.1, 1.1].map((x) => (
        <Box key={x} p={[x, 0.23, 0]} s={[0.16, 0.5, 0.75]} c={palette.metal} />
      ))}
    </group>
  );
}
