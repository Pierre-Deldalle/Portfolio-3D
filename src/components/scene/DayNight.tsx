import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

type DayNightProps = {
  isNight: boolean;
};

export default function DayNight({ isNight }: DayNightProps) {
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  const { scene } = useThree();

  useEffect(() => {
    // Change la couleur du fond
    const targetBackground = new THREE.Color(
      isNight ? "#182235" : "#e8e3db"
    );

    // Initialise le fond si nécessaire
    if (!(scene.background instanceof THREE.Color)) {
      scene.background = new THREE.Color("#e8e3db");
    }

    // Anime la transition du fond
    gsap.to(scene.background, {
      r: targetBackground.r,
      g: targetBackground.g,
      b: targetBackground.b,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // Garde la scène visible pendant la nuit
    if (ambientLightRef.current) {
      gsap.to(ambientLightRef.current, {
        intensity: isNight ? 0.7 : 1.2,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }

    // Change la lumière principale
    if (directionalLightRef.current) {
      gsap.to(directionalLightRef.current, {
        intensity: isNight ? 0.9 : 2,
        duration: 1.5,
        ease: "power2.inOut",
      });

      const targetColor = new THREE.Color(
        isNight ? "#b8c8ff" : "#ffffff"
      );

      gsap.to(directionalLightRef.current.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [isNight, scene]);

  return (
    <>
      <ambientLight
        ref={ambientLightRef}
        intensity={1.2}
      />

      <directionalLight
        ref={directionalLightRef}
        position={[4, 6, 4]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />
    </>
  );
}