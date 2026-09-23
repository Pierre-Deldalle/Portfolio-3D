import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Experience from "./scene/Experience";
import Intro from "./ui/Intro";
import Loader from "./ui/Loader";
import Credits from "./ui/Credits";

export default function Portfolio() {
  // Indique si l'utilisateur a commencé l'expérience
  const [started, setStarted] = useState(false);

  // Stocke la section actuellement sélectionnée
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Gère l'ouverture et la fermeture du panneau des crédits
  const [creditsOpen, setCreditsOpen] = useState(false);

  return (
    <>
      {/* Canvas contenant toute la scène 3D */}
      <Canvas
        shadows
        camera={{
          position: [-6, 2, 3],
          fov: 45,
        }}
      >
        {/* Scène principale du portfolio */}
        <Experience
          started={started}
          onStart={() => setStarted(true)}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />
      </Canvas>

      {/* Interface d'introduction affichée avant le début de l'expérience */}
      <Intro
        started={started}
        onOpenCredits={() => setCreditsOpen(true)}
      />

      {/* Panneau des crédits */}
      <Credits
        isOpen={creditsOpen}
        onClose={() => setCreditsOpen(false)}
      />

      {/* Écran de chargement */}
      <Loader />
    </>
  );
}