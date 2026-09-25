import "./Intro.css";

type IntroProps = {
  started: boolean;
  onOpenCredits: () => void;
  isNight: boolean;
  onToggleTheme: () => void;
};

export default function Intro({ started, onOpenCredits, isNight, onToggleTheme }: IntroProps) {
  return (

    // Cache progressivement l'introduction lorsque l'expérience commence
    <div className={`intro ${started ? "intro--hidden" : ""}`}>

      {/* Informations principales */}
      <div className="intro__info">
        <p className="intro__label">PORTFOLIO • 2026</p>

        <h1>
          PIERRE
          <span>DELDALLE</span>
        </h1>

        <div className="intro__separator" />

        <p className="intro__job">
          Développeur Web & Logiciel
        </p>

        <p className="intro__studies">
          Étudiant en BUT Informatique
        </p>
      </div>

      {/* Indication pour démarrer l'expérience */}
      <div className="intro__explore">
        <span>Cliquez sur le bureau pour explorer</span>
      </div>
              <button
        className="theme-button"
        onClick={onToggleTheme}
        aria-label={isNight ? "Passer en mode jour" : "Passer en mode nuit"}
        >
        <img
          src={
            isNight
              ? "/Icons/icon_theme_soleil.webp"
              : "/Icons/icon_theme_sombre.webp"
          }
          alt=""
        />
      </button>

      {/* Pied de page */}
      <footer className="intro__footer">
        <span>© 2026 Pierre Deldalle</span>

        <button type="button"
        onClick={onOpenCredits}>
          Crédits
        </button>
      </footer>

    </div>
  );
}