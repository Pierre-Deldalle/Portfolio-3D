import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Experience from "./scene/Experience";
import Intro from "./ui/Intro";
import Loader from "./ui/Loader";
import Credits from "./ui/Credits";

export default function Portfolio() {
  const [started, setStarted] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [-6, 2, 3],
          fov: 45,
        }}
      >
        <Experience
          started={started}
          onStart={() => setStarted(true)}
        />
      </Canvas>

      <Intro
        started={started}
        onOpenCredits={() => setCreditsOpen(true)}
      />

      <Credits
        isOpen={creditsOpen}
        onClose={() => setCreditsOpen(false)}
      />
      <Loader />
    </>
  );
}