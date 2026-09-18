import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import "./Loader.css";

export default function Loader() {
  const { progress } = useProgress();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={`loader ${hidden ? "loader--hidden" : ""}`}>
      <div className="loader__top">
        <span>PORTFOLIO • 2026</span>
      </div>

      <div className="loader__center">
        <h1 className="loader__name">
          PIERRE
          <span>DELDALLE</span>
        </h1>

        <div className="loader__loading">
          <div className="loader__loading-info">
            <span>CHARGEMENT DE L'EXPÉRIENCE</span>

            <span className="loader__percentage">
              {Math.round(progress)}%
            </span>
          </div>

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