import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Basketball from "../interactives/Basketball";
import type { ThreeEvent } from "@react-three/fiber";

type DeskProps = {
  onClick: () => void;
};

export default function Desk({ onClick }: DeskProps) {
  const { scene } = useGLTF("/models/desk.glb");

  useEffect(() => {
    /* Permet d'afficher les ombres des objets 3D */
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  /* Remonte les parents jusqu'à trouver l'objet BALLON */
  const findBasketball = (object: THREE.Object3D) => {
    let current: THREE.Object3D | null = object;

    while (current) {
      if (current.name === "BALLON") {
        return current;
      }

      current = current.parent;
    }

    return null;
  };

  return (
    <>
      <primitive
        object={scene}
        position={[0, -1.04, -2.21]}
        rotation={[0, Math.PI, 0]}
        scale={1.40}

        onClick={onClick}

        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          const basketball = findBasketball(event.object);

          if (basketball) {
            console.log("🏀 Hover ballon");

            document.body.style.cursor = "pointer";
            basketball.userData.handleMouseEnter?.();
          }
        }}

        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          const basketball = findBasketball(event.object);

          if (basketball) {
            console.log("🏀 Sortie ballon");

            document.body.style.cursor = "default";
            basketball.userData.handleMouseLeave?.();
          }
        }}
      />

      <Basketball scene={scene} />
    </>
  );
}

useGLTF.preload("/models/desk.glb");