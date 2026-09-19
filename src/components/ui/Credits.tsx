import "./Credits.css";

type CreditsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Credits({
  isOpen,
  onClose,
}: CreditsProps) {

  // N'affiche pas les crédits si le panneau est fermé
  if (!isOpen) return null;

  return (
    <div className="credits">

      {/* Fond permettant de fermer les crédits en cliquant à l'extérieur */}
      <div
        className="credits__overlay"
        onClick={onClose}
      />

      {/* Panneau principal des crédits */}
      <div className="credits__panel">

        {/* En-tête */}
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

        {/* Contenu des crédits */}
        <div className="credits__content">

          {/* Conception et développement */}
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

          {/* Technologies utilisées */}
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

          {/* Sources des modèles 3D */}
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