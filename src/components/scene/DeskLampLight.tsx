import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

type DeskLampLightProps = {
  isNight: boolean;
};

export default function DeskLampLight({ isNight }: DeskLampLightProps) {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  useEffect(() => {
    // Dirige la lumière vers le centre de la scène
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current;
      targetRef.current.updateMatrixWorld();
    }
  }, []);

  useEffect(() => {
    // Allume la lumière pendant la nuit
    if (lightRef.current) {
      gsap.to(lightRef.current, {
        intensity: isNight ? 8 : 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [isNight]);

  return (
    <>
      {/* Zone éclairée */}
      <object3D
        ref={targetRef}
        position={[0, 0, -1.8]}
      />

      {/* Lumière principale de nuit */}
      <spotLight
        ref={lightRef}
        position={[0, 4.5, 1.5]}
        angle={1.2}
        penumbra={0.9}
        intensity={0}
        distance={15}
        decay={1}
        color="#ffdca0"
        castShadow
        shadow-bias={-0.0005}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}