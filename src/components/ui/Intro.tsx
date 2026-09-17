import "./Intro.css";

type IntroProps = {
  started: boolean;
};

export default function Intro({ started }: IntroProps) {
  return (
    <div className={`intro ${started ? "intro--hidden" : ""}`}>

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

      <div className="intro__explore">
        <span>Cliquez sur le bureau pour explorer</span>
      </div>

      <footer className="intro__footer">
        <span>© 2026 Pierre Deldalle</span>

        <button type="button">
          Crédits
        </button>
      </footer>

    </div>
  );
}