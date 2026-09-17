import { OrbitControls } from "@react-three/drei";
import Desk from "./Desk";
import CameraController from "./CameraController";

type ExperienceProps = {
started: boolean;
onStart: () => void;
};

export default function Experience({ onStart, started }: ExperienceProps) {
return (
<>
    {/* Lumière générale */}
    <ambientLight intensity={1.2} />

    {/* Lumière principale */}
    <directionalLight
        position={[4, 6, 4]}
        intensity={2}
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
    />

    {/* Bureau */}
    <Desk onClick={onStart} />

    {/* Sol */}
    <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, -1.5]}
        receiveShadow
    >
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#d9d4cc" />
    </mesh>

    {/* Mur */}
    <mesh
        position={[0, 0.5, -3]}
        receiveShadow
    >
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial color="#e8e3db" />
    </mesh>

    <CameraController started={started} />
    <OrbitControls />
    </>
    );
    }