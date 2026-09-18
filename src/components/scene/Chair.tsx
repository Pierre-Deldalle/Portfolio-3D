import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

type ChairProps = {
  started: boolean;
};

export default function Chair({ started }: ChairProps) {
  const { scene } = useGLTF("/models/chair.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.material = object.material.clone();
        object.material.transparent = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!started) return;

    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        gsap.to(object.material, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    });
  }, [started, scene]);

  return (
    <primitive
      object={scene}
      position={[0, -1.04, -2.43]}
      rotation={[0, Math.PI, 0]}
      scale={1.15}
    />
  );
}

useGLTF.preload("/models/chair.glb");