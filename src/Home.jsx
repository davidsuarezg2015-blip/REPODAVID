import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Clock3, Info, LockKeyhole } from 'lucide-react';
import { BOOK, NONLINEAR, PHASES } from './content.js';
import { Eyebrow, PhaseIcon, phaseStyle } from './ui.jsx';
import landscape from './assets/paisaje-lavanda.webp';

export function Home({ onPhase, onBook }) {
  return (
    <div className="shell home-page" id="inicio">
      <section className="hero" aria-labelledby="home-title">
        <img className="hero-art" src={landscape} alt="" width="1264" height="848" fetchPriority="high" />
        <div className="hero-content">
          <span className="hero-badge"><BookOpen size={14} strokeWidth={1.8} aria-hidden="true" /> Inspirado en {BOOK.author}</span>
          <h1 id="home-title" tabIndex={-1}>Comprende tu duelo,<br /><em>a tu propio ritmo.</em></h1>
          <p className="hero-description">Una guía para reconocer cómo te sientes ante una pérdida y encontrar formas de cuidarte hoy.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#autoevaluacion">Iniciar autoevaluación <ArrowRight size={17} aria-hidden="true" /></a>
            <a className="button button--hero-secondary" href="#fases">Explorar las fases <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <div className="hero-details">
            <span><Clock3 size={15} aria-hidden="true" /> 3–5 minutos</span>
            <span className="details-separator" aria-hidden="true" />
            <span><LockKeyhole size={14} aria-hidden="true" /> Privado y sin registro</span>
          </div>
        </div>
      </section>

      <section className="phases-section" id="fases" aria-labelledby="phases-title">
        <div className="section-heading">
          <div>
            <Eyebrow className="eyebrow--line">Entender el proceso</Eyebrow>
            <h2 id="phases-title" tabIndex={-1}>Las cinco fases del duelo</h2>
            <p>Explora cómo puede sentirse cada reacción y qué podría ayudarte.</p>
          </div>
          <button className="button button--outline book-button" onClick={onBook} aria-haspopup="dialog">
            <BookOpen size={17} strokeWidth={1.8} aria-hidden="true" /> Sobre el libro
          </button>
        </div>
        <div className="phase-grid">
          {PHASES.map((phase, index) => (
            <button className="phase-card" style={phaseStyle(phase)} type="button" key={phase.id}
              onClick={() => onPhase(index)} aria-haspopup="dialog" aria-labelledby={`card-${phase.id}`} aria-describedby={`preview-${phase.id}`}>
              <span className="phase-card-top">
                <PhaseIcon phase={phase} />
                <span className="phase-number" aria-hidden="true">0{index + 1}</span>
              </span>
              <span className="phase-card-name" id={`card-${phase.id}`}>{phase.label}</span>
              <span className="phase-card-description" id={`preview-${phase.id}`}>{phase.preview}</span>
              <span className="phase-card-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={1.8} /></span>
            </button>
          ))}
        </div>
        <aside className="soft-note">
          <span className="soft-note-icon"><Info size={19} strokeWidth={1.8} aria-hidden="true" /></span>
          <div><strong>El duelo no sigue un orden fijo</strong><p>{NONLINEAR}</p></div>
        </aside>
      </section>
    </div>
  );
}
