import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

type BasketballProps = {
  scene: THREE.Group;
};

export default function Basketball({ scene }: BasketballProps) {
  useEffect(() => {
    const basketball = scene.getObjectByName("BALLON");

    if (!basketball) {
      console.warn("BALLON introuvable dans le GLB");
      return;
    }

    const startX = basketball.position.x;

    const startRotationZ = basketball.rotation.z;

    const handleMouseEnter = () => {
      gsap.to(basketball.position, {
        x: startX - 0.05,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(basketball.rotation, {
        z: startRotationZ - 0.2,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(basketball.position, {
        x: startX,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(basketball.rotation, {
        z: startRotationZ,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    basketball.userData.handleMouseEnter = handleMouseEnter;
    basketball.userData.handleMouseLeave = handleMouseLeave;
  }, [scene]);

  return null;
}