import assert from 'node:assert/strict';
import { test } from 'node:test';
import { evaluateAssessment, OMITTED } from '../src/assessment.js';
import { QUESTIONS } from '../src/content.js';
import { createReflectionReport } from '../src/report.js';

const date = new Date(2026, 10, 18, 12);
const profile = (...phases) => QUESTIONS.map(({ phase }) => phases.includes(phase) ? 3 : 0);
const scenarios = [
  ['leading', profile('negacion')],
  ['mixed', profile('ira', 'tristeza', 'aceptacion')],
  ['mixed', QUESTIONS.map(() => 3)],
  ['low', profile()],
  ['insufficient', QUESTIONS.map(() => OMITTED)],
];

for (const [index, [mode, answers]] of scenarios.entries()) {
  test(`genera un documento PDF válido en el caso ${mode} (${index + 1})`, () => {
    const result = evaluateAssessment(answers, date);
    assert.equal(result.mode, mode);
    const document = createReflectionReport(result);
    const pdf = Buffer.from(document.output('arraybuffer'));
    assert.match(pdf.subarray(0, 12).toString('ascii'), /^%PDF-/);
    assert.match(pdf.subarray(-20).toString('ascii'), /%%EOF/);
    assert.match(pdf.toString('latin1'), /\/Title \(Alivio \| Informe de reflexión personal\)/);
    assert.match(pdf.toString('latin1'), /\/Lang \(es-CO\)/);
    assert.equal(document.getNumberOfPages(), 1);
  });
}
