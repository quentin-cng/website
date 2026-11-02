import { RefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { obstacles } from "./environment/navigation";
import { firstProject } from "./interactions";
export default function CameraController({
  position,
  orbit,
  cinematic,
  reduced,
}: {
  position: RefObject<THREE.Vector3>;
  orbit: RefObject<{ yaw: number; pitch: number; drag: boolean }>;
  cinematic: boolean;
  reduced: boolean;
}) {
  const target = useRef(new THREE.Vector3()),
    desired = useRef(new THREE.Vector3()),
    direction = useRef(new THREE.Vector3()),
    initialized = useRef(false),
    look = useRef(new THREE.Vector3());
  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.04);
    const p = position.current;
    if (!cinematic) {
      target.current.copy(p).add(new THREE.Vector3(0, 2.6, 0));
      desired.current
        .set(
          Math.sin(orbit.current.yaw) * 11,
          2.2 + Math.sin(orbit.current.pitch) * 6,
          Math.cos(orbit.current.yaw) * 11,
        )
        .add(p);
      // Sweep the camera segment against expanded building boxes, stopping before entry.
      for (const o of obstacles.filter((o) => o.camera)) {
        const box = new THREE.Box3(
          new THREE.Vector3(o.x - o.w / 2 - 0.4, 0, o.z - o.d / 2 - 0.4),
          new THREE.Vector3(o.x + o.w / 2 + 0.4, o.h, o.z + o.d / 2 + 0.4),
        );
        const ray = new THREE.Ray(
          target.current,
          direction.current
            .copy(desired.current)
            .sub(target.current)
            .normalize(),
        );
        const hit = ray.intersectBox(box, new THREE.Vector3());
        if (
          hit &&
          hit.distanceTo(target.current) <
            desired.current.distanceTo(target.current)
        )
          desired.current.copy(hit).addScaledVector(direction.current, -0.3);
      }
    } else {
      target.current.set(
        firstProject.position[0],
        1.5,
        firstProject.position[2],
      );
      desired.current.set(...firstProject.camera);
    }
    if (!initialized.current) {
      camera.position.set(0, 10, 45);
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.fov = 55;
        camera.updateProjectionMatrix();
      }
      initialized.current = true;
    }
    camera.position.lerp(desired.current, reduced ? 1 : 1 - Math.exp(-3 * dt));
    look.current.lerp(target.current, reduced ? 1 : 1 - Math.exp(-4 * dt));
    camera.lookAt(look.current);
  });
  return null;
}
