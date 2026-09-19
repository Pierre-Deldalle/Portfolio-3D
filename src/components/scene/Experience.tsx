import { OrbitControls } from "@react-three/drei";
import Desk from "./Desk";
import CameraController from "./CameraController";
import Chair from "./Chair";

type ExperienceProps = {
  started: boolean;
  onStart: () => void;
};

export default function Experience({ onStart, started }: ExperienceProps) {

  // Contient les principaux éléments de la scène 3D
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={2}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Desk onClick={onStart} />

      <Chair started={started} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, -1.5]}
        receiveShadow
      >
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#d9d4cc" />
      </mesh>

      <mesh
        position={[0, 0.5, -3]}
        receiveShadow
      >
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#e8e3db" />
      </mesh>

      <mesh
        position={[1.4, 1.4, -2.98]}
      >
        <planeGeometry args={[0.75, 1]} />
        <meshStandardMaterial color="#3b5b92" />
      </mesh>

      <mesh
        position={[-1.7, 1.2, -2.98]}
      >
        <planeGeometry args={[1, 0.75]} />
        <meshStandardMaterial color="#3b5b92" />
      </mesh>

      <CameraController started={started} />

      <OrbitControls target={[0, 0.7, 0]} />
    </>
  );
}