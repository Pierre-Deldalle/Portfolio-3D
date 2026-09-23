import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import Basketball from "../interactives/Basketball";
import type { ThreeEvent } from "@react-three/fiber";
import Books from "../interactives/Books";

type DeskProps = {
  onClick: () => void;
  onSelectSection: (section: string) => void;
};

export default function Desk({
  onClick,
  onSelectSection,
}: DeskProps) {
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

  // Remonte les parents de l'objet
  // jusqu'à trouver un objet interactif
  const findInteractiveObject = (object: THREE.Object3D) => {
    let current: THREE.Object3D | null = object;

    while (current) {
      if (
        current.userData.handleMouseEnter ||
        current.userData.handleMouseLeave ||
        current.userData.handleClick
      ) {
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
        scale={1.4}

        // Détecte le clic sur le bureau ou un objet interactif
        onClick={(event: ThreeEvent<MouseEvent>) => {
          console.log(
            "🖱️ Clic détecté sur :",
            event.object.name
          );

          const interactiveObject =
            findInteractiveObject(event.object);

          console.log(
            "Objet interactif trouvé :",
            interactiveObject?.name
          );

          // Si l'objet possède une action au clic
          if (interactiveObject?.userData.handleClick) {
            event.stopPropagation();

            console.log("✅ handleClick lancé");

            interactiveObject.userData.handleClick();
            return;
          }

          // Sinon, démarre simplement l'expérience
          onClick();
        }}

        // Détecte le passage de la souris sur un objet interactif
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          const interactiveObject =
            findInteractiveObject(event.object);

          if (interactiveObject) {
            interactiveObject.userData.handleMouseEnter?.();
          }
        }}

        // Détecte lorsque la souris quitte un objet interactif
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          const interactiveObject =
            findInteractiveObject(event.object);

          if (interactiveObject) {
            interactiveObject.userData.handleMouseLeave?.();
          }
        }}
      />

      {/* Ajoute les interactions du ballon */}
      <Basketball scene={scene} />

      {/* Ajoute les interactions des livres */}
      <Books
        scene={scene}
        onSelectSection={onSelectSection}
      />
    </>
  );
}

// Précharge le modèle du bureau
useGLTF.preload("/models/desk.glb");