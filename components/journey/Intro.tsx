import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
function MapLabel({ text }: { text: string }) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#142628cc";
    ctx.fillRect(0, 0, 512, 64);
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#f1dcad";
    ctx.fillText(text, 256, 41);
    return new THREE.CanvasTexture(c);
  }, [text]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite position={[0, 0.19, 0]} scale={[0.94, 0.12, 1]}>
      <spriteMaterial map={texture} depthTest={false} />
    </sprite>
  );
}
export function geo(lon: number, lat: number, r = 2.65) {
  const a = THREE.MathUtils.degToRad(lat),
    b = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(
    r * Math.cos(a) * Math.sin(b),
    r * Math.sin(a),
    r * Math.cos(a) * Math.cos(b),
  );
}
export default function Intro({
  map,
  onFinish,
  onFade,
}: {
  map: THREE.Texture;
  onFinish: () => void;
  onFade: () => void;
}) {
  const plane = useRef<THREE.Group>(null);
  const progress = useRef({ t: 0, zoom: 0 });
  const { camera } = useThree();
  const a = useMemo(() => geo(5.4474, 43.5297).normalize(), []);
  const b = useMemo(() => geo(-73.5673, 45.5019).normalize(), []);
  const route = useMemo(() => {
    const theta = a.angleTo(b);
    return Array.from({ length: 101 }, (_, i) => {
      const t = i / 100;
      return a
        .clone()
        .multiplyScalar(Math.sin((1 - t) * theta) / Math.sin(theta))
        .addScaledVector(b, Math.sin(t * theta) / Math.sin(theta))
        .multiplyScalar(2.69 + Math.sin(t * Math.PI) * 0.48);
    });
  }, [a, b]);
  useEffect(() => {
    const timeline = gsap.timeline({ onComplete: onFinish });
    timeline
      .to(progress.current, { t: 1, duration: 7.5, ease: "power1.inOut" }, 1)
      .to(
        progress.current,
        { zoom: 1, duration: 2.5, ease: "power2.inOut" },
        8.5,
      )
      .call(onFade, [], 10.1);
    return () => {
      timeline.kill();
    };
  }, [onFinish, onFade]);
  useFrame(() => {
    const { t, zoom } = progress.current;
    const i = Math.min(99, Math.floor(t * 100));
    const point = route[i].clone().lerp(route[i + 1], t * 100 - i);
    if (plane.current) {
      plane.current.position.copy(point);
      plane.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        route[i + 1].clone().sub(route[i]).normalize(),
      );
    }
    camera.position.copy(
      new THREE.Vector3(-4.4, 3.8, 7.8).lerp(
        b.clone().multiplyScalar(3.1),
        zoom,
      ),
    );
    camera.lookAt(b.clone().multiplyScalar(zoom * 2.6));
  });
  return (
    <>
      <color attach="background" args={["#142628"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-4, 6, 7]} color="#ffe0ab" intensity={2.6} />
      <Stars radius={70} depth={20} count={700} factor={2} fade speed={0.15} />
      <mesh>
        <sphereGeometry args={[2.65, 96, 64]} />
        <meshStandardMaterial map={map} roughness={0.95} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.69, 64, 48]} />
        <meshBasicMaterial
          color="#b2c8b2"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>
      <Line points={route} color="#e1bd73" lineWidth={1.4} />
      {[
        [a, "AIX-EN-PROVENCE"],
        [b, "MONTRÉAL"],
      ].map(([v, label]) => (
        <group
          key={String(label)}
          position={(v as THREE.Vector3).clone().multiplyScalar(2.7)}
        >
          <mesh>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#f6d99e" />
          </mesh>
          <MapLabel text={String(label)} />
        </group>
      ))}
      <group ref={plane} scale={0.15}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.25, 1.9, 6]} />
          <meshStandardMaterial color="#fff0d1" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[2, 0.15, 0.45]} />
          <meshStandardMaterial color="#fff0d1" />
        </mesh>
      </group>
    </>
  );
}
export async function earthTexture() {
  const res = await fetch("/data/countries.json");
  if (!res.ok) throw new Error("Map unavailable");
  const data = await res.json();
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#294a4d";
  ctx.fillRect(0, 0, 2048, 1024);
  ctx.strokeStyle = "#3b5958";
  ctx.lineWidth = 1;
  for (let x = 0; x < 2048; x += 2048 / 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = 0; y < 1024; y += 1024 / 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#a6ad8d";
  ctx.strokeStyle = "#758b77";
  for (const f of data.features) {
    const polys =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates]
        : f.geometry.coordinates;
    for (const poly of polys) {
      ctx.beginPath();
      for (const ring of poly) {
        ring.forEach(([lon, lat]: number[], i: number) => {
          const x = ((lon + 180) / 360) * 2048,
            y = ((90 - lat) / 180) * 1024;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        });
        ctx.closePath();
      }
      ctx.fill("evenodd");
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // Three's sphere UV starts on the negative X axis; align longitude zero to +Z.
  texture.offset.x = 0.25;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}
