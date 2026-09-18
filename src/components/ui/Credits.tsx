import "./Credits.css";

type CreditsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Credits({
  isOpen,
  onClose,
}: CreditsProps) {
  if (!isOpen) return null;

  return (
    <div className="credits">
      <div
        className="credits__overlay"
        onClick={onClose}
      />

      <div className="credits__panel">
        <div className="credits__header">
          <div>
            <span className="credits__label">PORTFOLIO • 2026</span>
            <h2>CRÉDITS</h2>
          </div>

          <button
            className="credits__close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="credits__content">

          <section>
            <span className="credits__category">
              CONCEPTION & DÉVELOPPEMENT
            </span>

            <h3>Pierre Deldalle</h3>

            <p>
              Design, développement et intégration du portfolio.
            </p>
          </section>

          <section>
            <span className="credits__category">
              TECHNOLOGIES
            </span>

            <p>
              React : Architecture et gestion des composants
              <br />
              TypeScript : Développement et structuration du code
              <br />
              Three.js : Rendu et gestion des éléments 3D
              <br />
              React Three Fiber : Permet d'utiliser Three.js dans un site React
              <br />
               Drei: Composants et utilitaires pour React Three Fiber
               <br />
               GSAP: Animations et transitions avec des caméras
            </p>
          </section>

          <section>
            <span className="credits__category">
              ASSETS 3D
            </span>

            <h3>"Retro Office Setup"</h3>

            <p>
              Artiste : ILya Gamzayev
              <br />
              Source : <a className="credits__link" href="https://sketchfab.com/3d-models/90s-stylized-office-6dce10aa9372427daa06e3bd730cb8b3" target="_blank" rel="noopener noreferrer">Sketchfab</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}