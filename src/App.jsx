import { useEffect, useLayoutEffect, useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { Assessment } from './Assessment.jsx';
import { Results } from './Results.jsx';
import { Overlay } from './Overlay.jsx';
import { Home } from './Home.jsx';
import { QUESTIONS } from './content.js';
import { evaluateAssessment } from './assessment.js';
import { Brand } from './ui.jsx';

const paths = ['inicio', 'fases', 'autoevaluacion', 'informe'];
const readPage = () => paths.find((path) => `#${path}` === window.location.hash) ?? 'inicio';
const blankAnswers = () => Array(QUESTIONS.length).fill(null);

function Header({ page, hasResult, onSupport }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="Navegación principal" className="main-nav">
          <a href="#inicio" aria-current={page === 'inicio' ? 'page' : undefined}>Inicio</a>
          <a href="#fases" aria-current={page === 'fases' ? 'location' : undefined}>
            <span className="nav-label">Las cinco fases</span><span className="nav-label-short">Fases</span>
          </a>
          <a href="#autoevaluacion" aria-current={page === 'autoevaluacion' ? 'page' : undefined}>Autoevaluación</a>
          {hasResult && <a href="#informe" aria-current={page === 'informe' ? 'page' : undefined}>
            <span className="nav-label">Mi informe</span><span className="nav-label-short">Informe</span>
          </a>}
        </nav>
        <button className="button button--support" onClick={onSupport} aria-haspopup="dialog">
          <HeartHandshake size={18} strokeWidth={1.8} aria-hidden="true" /><span>Buscar apoyo</span>
        </button>
      </div>
    </header>
  );
}

function Footer({ onBook, onPrivacy }) {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand compact />
        <p>Una guía de reflexión, no un diagnóstico.</p>
        <div className="footer-links">
          <button onClick={onBook} aria-haspopup="dialog">Sobre la guía</button>
          <button onClick={onPrivacy} aria-haspopup="dialog">Privacidad</button>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [overlay, setOverlay] = useState(null);
  // Las respuestas viven solamente en esta pestaña, en memoria.
  const [session, setSession] = useState(() => ({ answers: blankAnswers(), step: 0, result: null }));
  const { answers, step, result } = session;

  useEffect(() => {
    const onHash = () => setPage(readPage());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useLayoutEffect(() => {
    const home = page === 'inicio' || page === 'fases';
    document.title = home ? 'Alivio · Una guía para comprender tu duelo' : page === 'autoevaluacion' ? 'Autoevaluación · Alivio' : 'Mi informe · Alivio';
    if (page === 'fases') {
      document.getElementById('fases')?.scrollIntoView({ block: 'start' });
      document.getElementById('phases-title')?.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      if (window.location.hash) document.querySelector('main h1')?.focus({ preventScroll: true });
    }
  }, [page]);

  const show = (type) => () => setOverlay({ type });
  const showPhase = (index) => setOverlay({ type: 'phase', index });
  const closeOverlay = () => setOverlay(null);
  const setStep = (next) => setSession((current) => ({ ...current, step: next }));

  function recordAnswer(value) {
    setSession((current) => {
      if (current.answers[current.step] === value) return current;
      const updated = [...current.answers];
      updated[current.step] = value;
      return { ...current, answers: updated, result: null };
    });
  }

  function completeAssessment() {
    setSession((current) => ({ ...current, result: evaluateAssessment(current.answers) }));
    window.location.hash = 'informe';
  }

  function resetAssessment() {
    setSession({ answers: blankAnswers(), step: 0, result: null });
    closeOverlay();
    window.location.hash = 'autoevaluacion';
  }

  function reviewAssessment() {
    setStep(0);
    window.location.hash = 'autoevaluacion';
  }

  return (
    <>
      <a className="skip-link" href="#contenido" onClick={(event) => { event.preventDefault(); document.getElementById('contenido')?.focus(); }}>Saltar al contenido</a>
      <Header page={page} hasResult={Boolean(result)} onSupport={show('support')} />
      <main id="contenido" tabIndex={-1}>
        {(page === 'inicio' || page === 'fases') && <Home onPhase={showPhase} onBook={show('book')} />}
        {page === 'autoevaluacion' && (
          <Assessment answers={answers} step={step} onAnswer={recordAnswer} onStep={setStep}
            onComplete={completeAssessment} onPrivacy={show('privacy')} />
        )}
        {page === 'informe' && <Results result={result} onPhase={showPhase} onReview={reviewAssessment} onReset={show('reset')} onSupport={show('support')} />}
      </main>
      <Footer onBook={show('book')} onPrivacy={show('privacy')} />
      {overlay && <Overlay key={overlay.type} {...overlay} onClose={closeOverlay} onPhase={showPhase} onReset={resetAssessment} />}
    </>
  );
}
