import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

type ChairProps = {
  started: boolean;
};

export default function Chair({ started }: ChairProps) {

  // Charge le modèle 3D de la chaise
  const { scene } = useGLTF("/models/chair.glb");

  useEffect(() => {

    // Parcourt tous les objets du modèle de la chaise
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {

        // Clone le matériau pour pouvoir le modifier indépendamment
        object.material = object.material.clone();

        // Autorise la modification de l'opacité du matériau
        object.material.transparent = true;
      }
    });

  }, [scene]);

  useEffect(() => {

    // Ne lance pas l'animation tant que l'expérience n'a pas commencé
    if (!started) return;

    // Parcourt tous les objets de la chaise
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {

        // Fait progressivement disparaître la chaise
        gsap.to(object.material, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    });

  }, [started, scene]);

  return (
    // Affiche le modèle 3D de la chaise dans la scène
    <primitive
      object={scene}
      position={[0, -1.04, -2.43]}
      rotation={[0, Math.PI, 0]}
      scale={1.15}
    />
  );
}

// Précharge le modèle pour éviter un chargement au moment de son affichage
useGLTF.preload("/models/chair.glb");