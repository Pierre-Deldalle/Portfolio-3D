import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Basketball from "../interactives/Basketball";
import type { ThreeEvent } from "@react-three/fiber";

type DeskProps = {
  onClick: () => void;
};

export default function Desk({ onClick }: DeskProps) {

  // Charge le modèle 3D complet du bureau
  const { scene } = useGLTF("/models/desk.glb");

  useEffect(() => {

    // Parcourt tous les objets du modèle pour activer leurs ombres
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

  }, [scene]);

  // Remonte les parents de l'objet survolé jusqu'à trouver le BALLON
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

      {/* Affiche le modèle 3D complet du bureau */}
      <primitive
        object={scene}
        position={[0, -1.04, -2.21]}
        rotation={[0, Math.PI, 0]}
        scale={1.40}

        // Démarre l'expérience lorsque l'utilisateur clique sur le bureau
        onClick={onClick}

        // Détecte le passage de la souris sur un objet du bureau
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          const basketball = findBasketball(event.object);

          // Si l'objet survolé appartient au ballon, lance son animation
          if (basketball) {
            console.log("🏀 Hover ballon");

            document.body.style.cursor = "pointer";
            basketball.userData.handleMouseEnter?.();
          }
        }}

        // Détecte lorsque la souris quitte un objet du bureau
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          const basketball = findBasketball(event.object);

          // Si la souris quitte le ballon, lance son animation de retour
          if (basketball) {
            console.log("🏀 Sortie ballon");

            document.body.style.cursor = "default";
            basketball.userData.handleMouseLeave?.();
          }
        }}
      />

      {/* Ajoute les interactions et animations du ballon */}
      <Basketball scene={scene} />

    </>
  );
}

// Précharge le modèle du bureau pour éviter un chargement au moment de son affichage
useGLTF.preload("/models/desk.glb");