import assert from 'node:assert/strict';
import { test } from 'node:test';
import { evaluateAssessment, formatScore, OMITTED, scoreDetails } from '../src/assessment.js';
import { GENERAL_TIPS, PHASES, QUESTIONS } from '../src/content.js';

const date = new Date(2026, 10, 18, 12);
const answersFor = (...leading) => QUESTIONS.map(({ phase }) => leading.includes(phase) ? 3 : 0);

test('las diez afirmaciones cubren cada fase dos veces', () => {
  assert.equal(QUESTIONS.length, 10);
  assert.equal(PHASES.length, 5);
  for (const phase of PHASES) assert.equal(QUESTIONS.filter((q) => q.phase === phase.id).length, 2);
});

for (const phase of PHASES) {
  test(`destaca ${phase.label} y recomienda cuidados específicos`, () => {
    const result = evaluateAssessment(answersFor(phase.id), date);
    assert.equal(result.mode, 'leading');
    assert.deepEqual(result.leading, [phase]);
    assert.equal(result.title, phase.label);
    assert.equal(result.date, date);
    assert.equal(result.answered, 10);
    assert.equal(result.scores.find((s) => s.phase.id === phase.id).mean, 3);
    assert.deepEqual(result.tips.map(({ title }) => title), phase.tips.map(({ title }) => title));
  });
}

test('no fuerza un desempate cuando dos fases difieren en solo medio punto', () => {
  const answers = answersFor('tristeza', 'aceptacion');
  answers[QUESTIONS.findIndex(({ phase }) => phase === 'aceptacion')] = 2;
  const result = evaluateAssessment(answers, date);
  assert.equal(result.mode, 'mixed');
  assert.deepEqual(result.leading.map(({ id }) => id), ['tristeza', 'aceptacion']);
  assert.deepEqual(result.tips.map(({ phase }) => phase.id), ['tristeza', 'aceptacion']);
});

test('no etiqueta un perfil sin señales destacadas', () => {
  const result = evaluateAssessment(QUESTIONS.map((_, i) => i < 5 ? 2 : 1), date);
  assert.equal(result.mode, 'low');
  assert.deepEqual(result.leading, []);
  assert.deepEqual(result.tips, GENERAL_TIPS);
});

test('las respuestas omitidas no se tratan como cero', () => {
  const answers = answersFor('pacto');
  answers[QUESTIONS.findIndex(({ phase }) => phase === 'pacto')] = OMITTED;
  const result = evaluateAssessment(answers, date);
  assert.equal(result.mode, 'leading');
  assert.equal(result.answered, 9);
  assert.equal(result.leading[0].id, 'pacto');
  assert.deepEqual(result.scores.find((s) => s.phase.id === 'pacto'), { phase: PHASES[2], count: 1, mean: 3 });
  assert.match(scoreDetails(result), /Omitir no equivale/);
});

test('requiere cobertura de todas las fases y al menos siete respuestas', () => {
  const missingPhase = QUESTIONS.map(({ phase }) => phase === 'ira' ? OMITTED : 3);
  const sparse = QUESTIONS.map((_, i) => i < 6 ? 3 : OMITTED);
  for (const answers of [missingPhase, sparse, QUESTIONS.map(() => OMITTED)]) {
    const result = evaluateAssessment(answers, date);
    assert.equal(result.mode, 'insufficient');
    assert.deepEqual(result.leading, []);
    assert.deepEqual(result.tips, GENERAL_TIPS);
  }
  const angerScore = evaluateAssessment(missingPhase, date).scores.find(({ phase }) => phase.id === 'ira');
  assert.equal(angerScore.mean, null);
  assert.equal(formatScore(angerScore.mean), 'Sin respuesta');
  assert.equal(formatScore(0), '0 de 3');
});

test('rechaza un formulario incompleto o con valores no admitidos', () => {
  assert.throws(() => evaluateAssessment(null), TypeError);
  assert.throws(() => evaluateAssessment([0]), TypeError);
  for (const invalid of [null, undefined, 4, -1, 1.5, '3']) {
    assert.throws(() => evaluateAssessment(QUESTIONS.map((_, i) => i === 0 ? invalid : 0)), TypeError);
  }
});
