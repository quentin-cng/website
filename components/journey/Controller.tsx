import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { obstacles } from "./World";
import Character from "./Character";
import CameraController from "./CameraController";
import { firstProject } from "./interactions";
export default function Controller({
  active,
  cinematic,
  reduced,
  onNear,
  onInteract,
  onEscape,
}: {
  active: boolean;
  cinematic: boolean;
  reduced: boolean;
  onNear: (v: boolean) => void;
  onInteract: () => void;
  onEscape: () => void;
}) {
  const avatar = useRef<THREE.Group>(null),
    left = useRef<THREE.Group>(null),
    right = useRef<THREE.Group>(null);
  const position = useRef(new THREE.Vector3(3, 0, 9));
  const keys = useRef(new Set<string>());
  const orbit = useRef({ yaw: 0, pitch: 0.45, drag: false });
  const nearby = useRef(false);
  const time = useRef(0);
  const { gl } = useThree();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof Element && !!e.target.closest('[role="dialog"]'))
      )
        return;
      const k = e.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
          "e",
          "escape",
          " ",
        ].includes(k)
      )
        e.preventDefault();
      keys.current.add(k);
      if (k === "e" && !e.repeat && active && nearby.current) onInteract();
      if (k === "escape") {
        orbit.current.drag = false;
        keys.current.clear();
        onEscape();
      }
    };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    const clear = () => {
      keys.current.clear();
      orbit.current.drag = false;
    };
    const pointerDown = (e: PointerEvent) => {
      if (active && e.button === 0) {
        orbit.current.drag = true;
        gl.domElement.setPointerCapture(e.pointerId);
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    const pointerUp = () => {
      orbit.current.drag = false;
    };
    const move = (e: PointerEvent) => {
      if (orbit.current.drag && active) {
        orbit.current.yaw -= e.movementX * 0.005;
        orbit.current.pitch = THREE.MathUtils.clamp(
          orbit.current.pitch + e.movementY * 0.003,
          0.2,
          0.95,
        );
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    gl.domElement.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
      gl.domElement.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointermove", move);
    };
  }, [active, gl, onInteract, onEscape]);
  useEffect(() => {
    keys.current.clear();
    orbit.current.drag = false;
  }, [active]);
  const direction = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.04);
    const k = keys.current;
    let x =
      Number(k.has("d") || k.has("arrowright")) -
      Number(k.has("a") || k.has("arrowleft"));
    let z =
      Number(k.has("s") || k.has("arrowdown")) -
      Number(k.has("w") || k.has("arrowup"));
    if (!active) {
      x = 0;
      z = 0;
    }
    const moving = !!(x || z);
    const p = position.current;
    if (moving) {
      direction.current
        .set(x, 0, z)
        .normalize()
        .applyAxisAngle(THREE.Object3D.DEFAULT_UP, orbit.current.yaw)
        .multiplyScalar(dt * 3.3);
      const blocked = (a: number, b: number) =>
        Math.abs(a) > 23 ||
        b > 22 ||
        b < -23 ||
        obstacles.some(
          (o) =>
            Math.abs(a - o.x) < o.w / 2 + 0.45 &&
            Math.abs(b - o.z) < o.d / 2 + 0.45,
        ) ||
        Math.hypot(a - 4, b - 4) < 0.85;
      if (!blocked(p.x + direction.current.x, p.z)) p.x += direction.current.x;
      if (!blocked(p.x, p.z + direction.current.z)) p.z += direction.current.z;
      const angle = Math.atan2(direction.current.x, direction.current.z);
      if (avatar.current)
        avatar.current.rotation.y +=
          Math.atan2(
            Math.sin(angle - avatar.current.rotation.y),
            Math.cos(angle - avatar.current.rotation.y),
          ) *
          (1 - Math.exp(-12 * dt));
    }
    time.current += dt;
    if (avatar.current)
      avatar.current.position.set(
        p.x,
        moving
          ? Math.sin(time.current * 14) * 0.035
          : Math.sin(time.current * 2) * 0.012,
        p.z,
      );
    if (left.current && right.current) {
      left.current.rotation.x = moving ? Math.sin(time.current * 10) * 0.55 : 0;
      right.current.rotation.x = -left.current.rotation.x;
    }
    const n =
      Math.hypot(
        p.x - firstProject.position[0],
        p.z - firstProject.position[2],
      ) < firstProject.radius;
    if (n !== nearby.current) {
      nearby.current = n;
      onNear(n);
    }
  });
  return (
    <>
      <Character avatar={avatar} left={left} right={right} />
      <CameraController
        position={position}
        orbit={orbit}
        cinematic={cinematic}
        reduced={reduced}
      />
    </>
  );
}
