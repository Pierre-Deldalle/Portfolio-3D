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

            <h3>Antoine Deldalle</h3>

            <p>
              Aide 3D.  
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

            <h3>Sketchfab</h3>
          </section>

        </div>
      </div>
    </div>
  );
}