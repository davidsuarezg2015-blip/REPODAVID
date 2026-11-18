import { GENERAL_TIPS, PHASES, QUESTIONS } from './content.js';

export const OMITTED = 'omitida';

const isScored = (answer) => Number.isInteger(answer) && answer >= 0 && answer <= 3;

export function evaluateAssessment(answers, date = new Date()) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length || QUESTIONS.some((_, i) => answers[i] !== OMITTED && !isScored(answers[i]))) {
    throw new TypeError('Se necesita una respuesta o una omisión por cada pregunta.');
  }

  const scores = PHASES.map((phase) => {
    const responses = QUESTIONS.flatMap((question, i) => question.phase === phase.id && isScored(answers[i]) ? [answers[i]] : []);
    const count = responses.length;
    return { phase, count, mean: count ? responses.reduce((sum, value) => sum + value, 0) / count : null };
  });
  const answered = scores.reduce((sum, score) => sum + score.count, 0);
  const coverage = answered >= 7 && scores.every(({ count }) => count > 0);
  const max = Math.max(...scores.map(({ mean }) => mean ?? 0));
  // Una regla de lectura de esta guía, no un criterio clínico. Evita desempatar fases con resultados cercanos.
  const leading = coverage && max >= 2
    ? scores.filter(({ mean }) => mean >= max - 0.5).sort((a, b) => b.mean - a.mean).map(({ phase }) => phase)
    : [];

  let title;
  let summary;
  let mode;
  let tips = GENERAL_TIPS;
  if (!coverage) {
    mode = 'insufficient';
    title = 'Aún no destaca una fase';
    summary = 'Para comparar las cinco fases, la guía necesita siete respuestas como mínimo, con al menos una por fase. Puedes volver a las preguntas o quedarte con las sugerencias generales.';
  } else if (!leading.length) {
    mode = 'low';
    title = 'Sin una fase predominante';
    summary = 'Ninguna de las cinco reacciones sobresale en tus respuestas. La guía no abarca todo lo que puedes sentir, y no necesitas identificarte con una fase para buscar apoyo.';
  } else if (leading.length === 1) {
    mode = 'leading';
    const phase = leading[0];
    title = phase.label;
    summary = phase.reflection;
    tips = phase.tips.map((tip) => ({ ...tip, phase }));
  } else {
    mode = 'mixed';
    title = 'Varias reacciones a la vez';
    summary = 'Algunas reacciones aparecen con una fuerza similar en tus respuestas. Pueden coexistir, incluso si por momentos parecen contradictorias. No tienes que escoger una sola.';
    if (leading.length <= 3) tips = leading.map((phase) => ({ ...phase.tips[0], phase }));
    else summary += ' Puedes explorar el perfil y elegir la sugerencia que se sienta más útil hoy.';
  }

  return { date, title, summary, mode, scores, leading, answered, total: QUESTIONS.length, tips };
}

export function formatScore(score) {
  return score === null ? 'Sin respuesta' : `${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 }).format(score)} de 3`;
}

export const formatDate = (date) => new Intl.DateTimeFormat('es-CO', { dateStyle: 'long' }).format(date);

export function scoreDetails(result) {
  return result.answered === result.total
    ? 'Cada valor es el promedio de dos respuestas (0 = nada, 3 = mucho). No indica avance ni gravedad.'
    : 'Se promedian solo las respuestas compartidas (0 = nada, 3 = mucho). Omitir no equivale a responder «Nada».';
}
