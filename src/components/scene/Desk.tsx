import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function Desk() {
  const { scene } = useGLTF("/models/desk.glb");

  useEffect(() => {
    /*Permet d'afficher les ombres des objets 3D*/
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
    object={scene}
    position={[0, -1.04, -2.43]}
    rotation={[0, Math.PI, 0]}
    scale={1}
    />
  );
}

useGLTF.preload("/models/desk.glb");