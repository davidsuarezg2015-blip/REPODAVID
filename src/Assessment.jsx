import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ClipboardList, Clock3, LockKeyhole, Sprout } from 'lucide-react';
import { LIMITS, OPTIONS, QUESTIONS } from './content.js';
import { OMITTED } from './assessment.js';
import { Eyebrow } from './ui.jsx';
import landscape from './assets/paisaje-lavanda.webp';

export function Assessment({ answers, step, onAnswer, onStep, onComplete, onPrivacy }) {
  const [error, setError] = useState(false);
  const current = answers[step];
  const previousStep = useRef(step);
  const questionTitle = useRef(null);
  const questionCard = useRef(null);
  const firstOption = useRef(null);
  const last = step === QUESTIONS.length - 1;

  useLayoutEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    if (questionCard.current.getBoundingClientRect().top < 135) {
      questionCard.current.scrollIntoView({ block: 'start' });
    }
    questionTitle.current.focus({ preventScroll: true });
  }, [step]);

  function choose(value) {
    setError(false);
    onAnswer(value);
  }

  function goBack() {
    setError(false);
    onStep(step - 1);
  }

  function submit(event) {
    event.preventDefault();
    if (current === null) {
      setError(true);
      firstOption.current.focus({ preventScroll: true });
      return;
    }
    if (last) onComplete();
    else onStep(step + 1);
  }

  return (
    <div className="shell inner-page assessment-page">
      <a href="#inicio" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> Volver al inicio</a>
      <div className="page-heading">
        <Eyebrow className="eyebrow--line">Autoevaluación</Eyebrow>
        <h1 id="assessment-title" tabIndex={-1}>¿Cómo te has sentido?</h1>
        <p>Piensa en una pérdida o en un cambio difícil y en cómo lo has vivido durante los últimos siete días.</p>
      </div>

      <div className="assessment-layout">
        <form className="question-card panel" ref={questionCard} onSubmit={submit} aria-labelledby="question-title">
          <div className="question-progress">
            <div className="question-progress-label">
              <span><ClipboardList size={17} strokeWidth={1.85} aria-hidden="true" /> Pregunta {step + 1} de {QUESTIONS.length}</span>
              <span className="progress-count">{answers.filter((answer) => Number.isInteger(answer)).length} respondidas</span>
            </div>
            <div className="progress-segments" role="progressbar" aria-label="Pregunta actual" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step + 1}>
              {QUESTIONS.map(({ text }, i) => <span key={text} className={i === step ? 'segment-current' : i < step ? 'segment-done' : undefined} />)}
            </div>
          </div>

          <div className="question-body">
            <p className="question-caption">¿Cuánto te describe esta afirmación?</p>
            <h2 id="question-title" tabIndex={-1} ref={questionTitle}>{QUESTIONS[step].text}</h2>
            <fieldset className="options" aria-labelledby="question-title" aria-describedby={error ? 'response-error' : undefined}>
              <legend className="sr-only">Selecciona una opción</legend>
              {OPTIONS.map((option, i) => (
                <label className="option" key={option.value}>
                  <input className="sr-only" type="radio" name="reflection" value={option.value} checked={current === option.value}
                    ref={i === 0 ? firstOption : undefined} onChange={() => choose(option.value)} />
                  <span className="option-surface">
                    <span className="radio-mark" aria-hidden="true" />
                    <span className="option-name">{option.label}</span>
                    <span className="option-detail" aria-hidden="true">{option.detail}</span>
                  </span>
                </label>
              ))}
              <label className="option option--skip">
                <input className="sr-only" type="radio" name="reflection" value={OMITTED} checked={current === OMITTED} onChange={() => choose(OMITTED)} />
                <span className="option-surface"><span className="radio-mark" aria-hidden="true" /><span>Prefiero no responder</span></span>
              </label>
            </fieldset>
            {error && <p id="response-error" className="form-error" role="alert">Elige una opción o marca «Prefiero no responder».</p>}
          </div>

          <div className="question-actions">
            <button type="button" className="button button--outline" onClick={goBack} disabled={step === 0}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button>
            <button type="submit" className="button button--primary">
              {last ? 'Ver mi informe' : 'Siguiente'}<ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </form>

        <aside className="assessment-aside" aria-label="Antes de responder">
          <div className="assessment-guide">
            <span className="context-icon"><Sprout size={24} strokeWidth={1.7} aria-hidden="true" /></span>
            <h2>Antes de responder</h2>
            <ul>
              <li><Check size={17} aria-hidden="true" /> No hay respuestas correctas ni incorrectas.</li>
              <li><ArrowRight size={16} aria-hidden="true" /> Puedes omitir lo que no quieras responder.</li>
              <li><Clock3 size={16} aria-hidden="true" /> Tómate el tiempo que necesites.</li>
            </ul>
            <img src={landscape} alt="" width="1264" height="848" />
          </div>
          <button className="privacy-card panel" onClick={onPrivacy} aria-haspopup="dialog" type="button">
            <span className="privacy-icon"><LockKeyhole size={19} strokeWidth={1.8} aria-hidden="true" /></span>
            <span><strong>Privado y sin registro</strong><small>Tus respuestas se quedan en esta pestaña.</small></span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="aside-disclaimer">{LIMITS}</p>
        </aside>
      </div>
    </div>
  );
}
