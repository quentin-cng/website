import { RefObject } from "react";
import * as THREE from "three";
export default function Character({
  avatar,
  left,
  right,
}: {
  avatar: RefObject<THREE.Group | null>;
  left: RefObject<THREE.Group | null>;
  right: RefObject<THREE.Group | null>;
}) {
  return (
    <group ref={avatar} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <capsuleGeometry args={[0.23, 0.45, 4, 8]} />
        <meshStandardMaterial color="#e0ccb0" />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.23, 8, 8]} />
        <meshStandardMaterial color="#bb8d69" />
      </mesh>
      <mesh position={[0, 1.69, -0.025]} castShadow>
        <sphereGeometry
          args={[0.235, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.58]}
        />
        <meshStandardMaterial color="#3c3930" />
      </mesh>
      <mesh position={[0, 1.08, -0.24]} castShadow>
        <boxGeometry args={[0.38, 0.46, 0.18]} />
        <meshStandardMaterial color="#546c61" />
      </mesh>
      {[-1, 1].map((sign, i) => (
        <group
          key={sign}
          ref={i === 0 ? left : right}
          position={[sign * 0.14, 0.65, 0]}
        >
          <mesh position={[0, -0.25, 0]} castShadow>
            <capsuleGeometry args={[0.095, 0.37, 3, 6]} />
            <meshStandardMaterial color="#394b4b" />
          </mesh>
          <mesh position={[0, -0.54, 0.07]} castShadow>
            <boxGeometry args={[0.19, 0.13, 0.31]} />
            <meshStandardMaterial color="#413e35" />
          </mesh>
          <mesh position={[sign * 0.19, 0.35, 0]} castShadow>
            <capsuleGeometry args={[0.075, 0.4, 3, 6]} />
            <meshStandardMaterial color="#dbc7aa" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
