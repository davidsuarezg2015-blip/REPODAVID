import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, ClipboardList, Download, HeartHandshake, Info, RotateCcw, Sparkles } from 'lucide-react';
import { formatDate, formatScore, scoreDetails } from './assessment.js';
import { LIMITS, NONLINEAR, PROFESSIONAL_SUPPORT, URGENT_SUPPORT } from './content.js';
import { Eyebrow, PhaseIcon, phaseStyle } from './ui.jsx';

function ScoreRow({ score, index, onPhase, partial }) {
  const { phase, mean, count } = score;
  return (
    <li className="score-row" style={phaseStyle(phase)}>
      <button className="score-phase" onClick={() => onPhase(index)} aria-haspopup="dialog">
        <PhaseIcon phase={phase} /><span>{phase.label}</span><ArrowUpRight size={14} aria-hidden="true" />
      </button>
      <div className="score-display">
        <div className="score-meter" aria-hidden="true"><span style={{ width: `${mean === null ? 0 : mean / 3 * 100}%` }} /></div>
        <div className="score-caption"><span>{formatScore(mean)}</span>{partial && <small>{count} de 2 respuestas</small>}</div>
      </div>
    </li>
  );
}

export function Results({ result, onPhase, onReview, onReset, onSupport }) {
  const [download, setDownload] = useState('idle');
  const phase = result?.mode === 'leading' ? result.leading[0] : null;

  async function downloadReport() {
    setDownload('pending');
    try {
      const { downloadReflectionReport } = await import('./report.js');
      await downloadReflectionReport(result);
      setDownload('done');
    } catch {
      setDownload('error');
    }
  }

  if (!result) {
    return (
      <div className="shell inner-page empty-report-page">
        <section className="panel empty-report" aria-labelledby="empty-title">
          <span className="context-icon"><ClipboardList size={26} aria-hidden="true" /></span>
          <Eyebrow>Tu reflexión</Eyebrow>
          <h1 id="empty-title" tabIndex={-1}>Aún no hay un informe</h1>
          <p>Completa la autoevaluación para ver qué reacciones destacan y descargar tus sugerencias. Al cerrar o recargar esta pestaña, las respuestas se borran.</p>
          <a className="button button--primary" href="#autoevaluacion">Ir a la autoevaluación <ArrowRight size={17} aria-hidden="true" /></a>
        </section>
      </div>
    );
  }

  return (
    <div className="shell inner-page results-page">
      <button className="back-link" type="button" onClick={onReview}><ArrowLeft size={16} aria-hidden="true" /> Revisar mis respuestas</button>
      <section className="result-hero" aria-labelledby="result-title">
        <div className="result-hero-content">
          {phase ? <PhaseIcon phase={phase} className="result-phase-icon" /> : <span className="context-icon"><Sparkles size={25} strokeWidth={1.7} aria-hidden="true" /></span>}
          <Eyebrow>Tu reflexión de hoy</Eyebrow>
          <h1 id="result-title" tabIndex={-1}>{result.title}</h1>
          <p className="result-summary">{result.summary}</p>
          {result.mode === 'mixed' && <ul className="result-phase-tags" aria-label="Reacciones con puntuaciones similares">
            {result.leading.map((item) => <li style={phaseStyle(item)} key={item.id}>{item.label}</li>)}
          </ul>}
          <div className="result-meta">
            <span><CalendarDays size={16} aria-hidden="true" /> {formatDate(result.date)}</span>
            <span><ClipboardList size={16} aria-hidden="true" /> {result.answered} de {result.total} respuestas</span>
          </div>
        </div>
        <div className="result-download">
          <button className="button button--primary" onClick={downloadReport} disabled={download === 'pending'}>
            <Download size={18} aria-hidden="true" /> {download === 'pending' ? 'Preparando el PDF…' : 'Descargar informe PDF'}
          </button>
          <p>Incluye el perfil y las recomendaciones.</p>
          {download === 'done' && <p className="download-success" role="status"><CheckCircle2 size={15} aria-hidden="true" /> PDF listo para guardar.</p>}
          {download === 'error' && <p className="form-error" role="alert">No se pudo generar el PDF. Vuelve a intentarlo.</p>}
        </div>
      </section>

      <div className="results-layout">
        <section className="panel results-panel" aria-labelledby="profile-title">
          <Eyebrow className="eyebrow--line">Lo que compartiste</Eyebrow>
          <h2 id="profile-title">Perfil de respuestas</h2>
          <p>{scoreDetails(result)}</p>
          <ul className="score-list">{result.scores.map((score, index) => <ScoreRow key={score.phase.id} score={score} index={index} onPhase={onPhase} partial={result.answered < result.total} />)}</ul>
        </section>
        <section className="panel results-panel" aria-labelledby="suggestions-title">
          <Eyebrow className="eyebrow--line">Ideas de cuidado</Eyebrow>
          <h2 id="suggestions-title">Sugerencias para hoy</h2>
          <p>Si alguna te sirve, puedes empezar por esa. No tienes que hacerlas todas.</p>
          <ol className="recommendations">
            {result.tips.map((tip, index) => (
              <li className="recommendation" key={tip.title} style={tip.phase ? phaseStyle(tip.phase) : undefined}>
                <span className="tip-number" aria-hidden="true">0{index + 1}</span>
                <div>{tip.phase && result.mode === 'mixed' && <span className="tip-phase">{tip.phase.label}</span>}<h3>{tip.title}</h3><p>{tip.text}</p></div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <aside className="soft-note result-note">
        <span className="soft-note-icon"><Info size={19} strokeWidth={1.8} aria-hidden="true" /></span>
        <div><strong>Una orientación, no un diagnóstico</strong><p>{LIMITS} {NONLINEAR}</p></div>
      </aside>
      <div className="result-end">
        <div><p>{PROFESSIONAL_SUPPORT}</p><p>{URGENT_SUPPORT}</p></div>
        <button className="button button--outline" onClick={onSupport} aria-haspopup="dialog"><HeartHandshake size={18} aria-hidden="true" /> Buscar apoyo</button>
        <button className="button button--quiet" onClick={onReset} aria-haspopup="dialog"><RotateCcw size={16} aria-hidden="true" /> Nueva reflexión</button>
      </div>
    </div>
  );
}
