import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import "./Loader.css";

export default function Loader() {

  // Récupère la progression du chargement des éléments 3D
  const { progress } = useProgress();

  // Permet de gérer la disparition du loader
  const [hidden, setHidden] = useState(false);

  useEffect(() => {

    // Lance la disparition du loader lorsque le chargement est terminé
    if (progress === 100) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 500);

      // Nettoie le timer si le composant est démonté
      return () => clearTimeout(timer);
    }

  }, [progress]);

  return (

    // Ajoute la classe de disparition lorsque le chargement est terminé
    <div className={`loader ${hidden ? "loader--hidden" : ""}`}>

      {/* Titre */}
      <div className="loader__top">
        <span>PORTFOLIO • 2026</span>
      </div>

      {/* Contenu principal du loader */}
      <div className="loader__center">
        <h1 className="loader__name">
          PIERRE
          <span>DELDALLE</span>
        </h1>

        {/* Progression du chargement */}
        <div className="loader__loading">
          <div className="loader__loading-info">
            <span>CHARGEMENT DE L'EXPÉRIENCE</span>

            <span className="loader__percentage">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Barre de progression */}
          <div className="loader__bar">
            <div
              className="loader__progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}