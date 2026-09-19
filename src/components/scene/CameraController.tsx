import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

type CameraControllerProps = {
  started: boolean;
};

export default function CameraController({
  started,
}: CameraControllerProps) {

  // Récupère la caméra utilisée dans la scène Three.js
  const { camera } = useThree();

  useEffect(() => {

    // Ne lance pas le travelling tant que l'utilisateur n'a pas démarré l'expérience
    if (!started) return;

    // Anime la position de la caméra vers le bureau
    gsap.to(camera.position, {
      x: 0,
      y: 1,
      z: 2,

      // Durée et fluidité du travelling
      duration: 2,
      ease: "power2.inOut",
    });

  }, [started, camera]);

  // Ce composant gère uniquement le comportement de la caméra
  return null;
}