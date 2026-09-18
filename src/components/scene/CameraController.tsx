import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

type CameraControllerProps = {
  started: boolean;
};

export default function CameraController({
  started,
}: CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    if (!started) return;

    gsap.to(camera.position, {
      x: 0,
      y: 1,
      z: 2,

      duration: 2,
      ease: "power2.inOut",
    });
  }, [started, camera]);

  return null;
}