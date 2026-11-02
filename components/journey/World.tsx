import Hangar from "./environment/Hangar";
import EducationWorld from "./environment/EducationWorld";
import TechnologyWorld from "./environment/TechnologyWorld";
import CreativeWorld from "./environment/CreativeWorld";
import InterestsWorld from "./environment/InterestsWorld";
export default function World({
  near,
  reduced,
}: {
  near: boolean;
  reduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#a9b3a1"]} />
      <fog attach="fog" args={["#a4ad9a", 45, 135]} />
      <hemisphereLight args={["#e8eed9", "#617267", 1.4]} />
      <directionalLight
        position={[-28, 42, 10]}
        intensity={3}
        color="#ffe0a6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-55}
        shadow-camera-right={55}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-far={150}
        shadow-normalBias={0.06}
        shadow-radius={3}
      />
      <pointLight
        position={[-22, 7, 9]}
        color="#ffcd92"
        intensity={65}
        distance={23}
        decay={2}
      />
      <pointLight
        position={[22, 7, -24]}
        color="#cee9de"
        intensity={65}
        distance={23}
        decay={2}
      />
      <Hangar />
      <EducationWorld />
      <TechnologyWorld near={near} reduced={reduced} />
      <CreativeWorld />
      <InterestsWorld />
    </>
  );
}
