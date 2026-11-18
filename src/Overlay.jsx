import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, HeartHandshake, LockKeyhole, Phone, RotateCcw, X } from 'lucide-react';
import { BOOK, LIMITS, PHASES, PROFESSIONAL_SUPPORT, SUPPORT_SOURCE } from './content.js';
import { Eyebrow, PhaseIcon } from './ui.jsx';

export function Overlay({ type, index, onClose, onPhase, onReset }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const title = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    const opener = document.activeElement;
    element.showModal();
    closeButton.current.focus({ preventScroll: true });
    return () => {
      element.close();
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  function changePhase(next) {
    onPhase(next);
    dialog.current.scrollTop = 0;
    title.current.focus({ preventScroll: true });
  }

  function heading(text) {
    return <h2 id="dialog-title" tabIndex={-1} ref={title}>{text}</h2>;
  }

  let content;
  if (type === 'phase') {
    const phase = PHASES[index];
    content = (
      <>
        <div className="dialog-phase-intro"><PhaseIcon phase={phase} /><Eyebrow>Fase {index + 1} de {PHASES.length}</Eyebrow></div>
        {heading(phase.id === 'negacion' ? phase.bookTitle : phase.label)}
        <p>{phase.description}</p>
        <h3>Cómo se puede sentir</h3>
        <ul className="signal-list">{phase.signs.map((sign) => <li key={sign}>{sign}</li>)}</ul>
        <div className="dialog-tip"><strong>{phase.tips[0].title}</strong><p>{phase.tips[0].text}</p></div>
        <p className="dialog-reference"><BookOpen size={16} aria-hidden="true" /> En el libro: «{phase.bookTitle}», cap. {phase.chapter}, p. {phase.page}.</p>
        <div className="dialog-pagination">
          <button type="button" className="button button--outline" disabled={index === 0} onClick={() => changePhase(index - 1)}><ArrowLeft size={16} aria-hidden="true" /> Anterior</button>
          {index < PHASES.length - 1
            ? <button type="button" className="button button--primary" onClick={() => changePhase(index + 1)}>Siguiente fase <ArrowRight size={16} aria-hidden="true" /></button>
            : <button type="button" className="button button--primary" onClick={onClose}>Listo</button>}
        </div>
      </>
    );
  } else if (type === 'book') {
    content = (
      <>
        <span className="context-icon"><BookOpen size={23} aria-hidden="true" /></span>
        <Eyebrow>La fuente de esta guía</Eyebrow>
        {heading('Sobre el libro')}
        <p><cite>{BOOK.title}</cite>, de {BOOK.author}. {BOOK.edition}. Traducción de {BOOK.translator}.</p>
        <p>La autora describió estas reacciones a partir de conversaciones con personas que afrontaban el final de su vida. Alivio las presenta como un marco para reflexionar ante una pérdida, no como pasos que todas las personas deban seguir.</p>
        <h3>Lecturas en la edición adjunta</h3>
        <ul className="reading-list">
          {PHASES.map((phase) => <li key={phase.id}><span>{phase.bookTitle}</span><small>Cap. {phase.chapter} · p. {phase.page}</small></li>)}
          <li><span>Esperanza</span><small>Cap. 8 · p. 109</small></li>
        </ul>
        <p className="dialog-reference">El libro describe la esperanza como algo que puede acompañar a distintas reacciones, no como una sexta fase. También explica que las fases pueden superponerse (cap. 11, p. 202).</p>
        <p className="dialog-tip">{LIMITS}</p>
      </>
    );
  } else if (type === 'support') {
    content = (
      <>
        <span className="context-icon"><HeartHandshake size={24} aria-hidden="true" /></span>
        <Eyebrow>Acompañamiento</Eyebrow>
        {heading('No tienes que afrontarlo sin apoyo')}
        <p>{PROFESSIONAL_SUPPORT} También puedes contarle a una persona de confianza qué necesitas hoy.</p>
        <h3>Si estás en Bogotá</h3>
        <div className="support-options">
          <a className="support-option" href="tel:106"><Phone size={20} aria-hidden="true" /><span><strong>Línea 106</strong><small>Escucha y orientación en salud mental, 24 horas.</small></span><ArrowUpRight size={17} aria-hidden="true" /></a>
          <a className="support-option" href="tel:123"><Phone size={20} aria-hidden="true" /><span><strong>Línea 123</strong><small>Emergencias o peligro inmediato.</small></span><ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
        <p className="dialog-reference">Fuera de Bogotá, usa el número de emergencias de tu localidad si hay peligro inmediato.</p>
        <a className="text-link" href={SUPPORT_SOURCE} target="_blank" rel="noreferrer">Consultar la fuente oficial <ArrowUpRight size={15} aria-hidden="true" /></a>
      </>
    );
  } else if (type === 'privacy') {
    content = (
      <>
        <span className="context-icon"><LockKeyhole size={23} aria-hidden="true" /></span>
        <Eyebrow>Tu espacio personal</Eyebrow>
        {heading('Tus respuestas son privadas')}
        <p>No necesitas crear una cuenta ni dar tu nombre. Tus respuestas y el resultado se calculan en esta pestaña: no se envían a un servidor ni se guardan en el navegador.</p>
        <p>Si cierras o recargas la página, se borrarán. Si decides descargar el PDF, quedará en tu dispositivo. Tú decides si quieres guardarlo o compartirlo.</p>
        <p className="dialog-tip">Si usas un dispositivo compartido, guarda el PDF solo si tienes un lugar privado para hacerlo.</p>
      </>
    );
  } else {
    content = (
      <>
        <span className="context-icon"><RotateCcw size={23} aria-hidden="true" /></span>
        {heading('¿Hacer una nueva reflexión?')}
        <p>Se borrarán las respuestas y el informe de esta pestaña. Si ya descargaste un PDF, ese archivo se conservará.</p>
        <div className="dialog-pagination dialog-pagination--end">
          <button className="button button--outline" onClick={onClose}>Cancelar</button>
          <button className="button button--primary" onClick={onReset}>Empezar de nuevo</button>
        </div>
      </>
    );
  }

  return (
    <dialog ref={dialog} className="overlay" aria-labelledby="dialog-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
      <div className="overlay-inner">
        <button ref={closeButton} className="icon-button close-dialog" type="button" onClick={onClose} aria-label="Cerrar ventana"><X size={21} aria-hidden="true" /></button>
        {content}
      </div>
    </dialog>
  );
}
