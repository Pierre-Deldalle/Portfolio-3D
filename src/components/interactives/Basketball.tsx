import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

type BasketballProps = {
  scene: THREE.Group;
};

export default function Basketball({ scene }: BasketballProps) {
  useEffect(() => {
    // Récupère le ballon dans le modèle 3D grâce à son nom Blender
    const basketball = scene.getObjectByName("BALLON");

    // Arrête le script si le ballon n'est pas trouvé dans le modèle
    if (!basketball) {
      console.warn("BALLON introuvable dans le GLB");
      return;
    }

    // Récupère le canvas Three.js
    const canvas = document.querySelector("canvas");

    // Sauvegarde la position horizontale d'origine du ballon
    const startX = basketball.position.x;

    // Sauvegarde la rotation d'origine du ballon
    const startRotationZ = basketball.rotation.z;

    // Sauvegarde la hauteur d'origine du ballon
    const startY = basketball.position.y;

    // Animation lorsque la souris passe sur le ballon
    const handleMouseEnter = () => {
      // Change le curseur sur le canvas
      if (canvas) {
        canvas.style.cursor =
          'url("/cursors/pointer-gray.png") 8 2, pointer';
      }

      // Déplace légèrement le ballon
      gsap.to(basketball.position, {
        x: startX - 0.05,
        y: startY + 0.04,
        duration: 0.6,
        ease: "power2.out",
      });

      // Fait tourner le ballon pour simuler un roulement
      gsap.to(basketball.rotation, {
        z: startRotationZ - 0.2,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    // Animation lorsque la souris quitte le ballon
    const handleMouseLeave = () => {
      // Remet le curseur normal sur le canvas
      if (canvas) {
        canvas.style.cursor =
          'url("/cursors/cursor-gray.png") 4 4, auto';
      }

      // Replace le ballon à sa position d'origine
      gsap.to(basketball.position, {
        x: startX,
        y: startY,
        duration: 0.6,
        ease: "power2.out",
      });

      // Replace le ballon à sa rotation d'origine
      gsap.to(basketball.rotation, {
        z: startRotationZ,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    // Stocke les fonctions dans le ballon pour pouvoir les appeler depuis Desk.tsx
    basketball.userData.handleMouseEnter = handleMouseEnter;
    basketball.userData.handleMouseLeave = handleMouseLeave;
  }, [scene]);

  // Le ballon est déjà affiché dans Desk.tsx, ce composant gère uniquement son comportement
  return null;
}