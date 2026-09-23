import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

type CameraControllerProps = {
  started: boolean;
  selectedSection: string | null;
};

export default function CameraController({
  started,
  selectedSection,
}: CameraControllerProps) {
  const { camera } = useThree();

  // Stocke en permanence l'endroit regardé par la caméra
  const lookAtTarget = useRef({
    x: 0,
    y: 0.7,
    z: 0,
  });

  useEffect(() => {
    if (!started) return;

    // =========================
    // VUE PRINCIPALE DU BUREAU
    // =========================

    if (!selectedSection) {
      // Déplace la caméra
      gsap.to(camera.position, {
        x: 0,
        y: 1,
        z: 2,
        duration: 1.4,
        ease: "power2.inOut",
      });

      // Anime progressivement la direction du regard
      gsap.to(lookAtTarget.current, {
        x: 0,
        y: 0.7,
        z: 0,
        duration: 1.4,
        ease: "power2.inOut",

        onUpdate: () => {
          camera.lookAt(
            lookAtTarget.current.x,
            lookAtTarget.current.y,
            lookAtTarget.current.z
          );
        },
      });

      return;
    }

    // =========================
    // SECTION ÉTUDES
    // =========================

    if (selectedSection === "studies") {
      // Déplace la caméra vers les livres
      gsap.to(camera.position, {
        x: 1.05,
        y: 1.25,
        z: -0.3,
        duration: 1.4,
        ease: "power2.inOut",
      });

      // Déplace progressivement le point regardé
      gsap.to(lookAtTarget.current, {
        x: -3.5,
        y: 0.75,
        z: -1.95,
        duration: 1.4,
        ease: "power2.inOut",

        onUpdate: () => {
          camera.lookAt(
            lookAtTarget.current.x,
            lookAtTarget.current.y,
            lookAtTarget.current.z
          );
        },
      });
    }
  }, [started, selectedSection, camera]);

  return null;
}