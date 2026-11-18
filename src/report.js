import { jsPDF } from 'jspdf';
import { formatDate, formatScore, scoreDetails } from './assessment.js';
import { BOOK, LIMITS, NONLINEAR, PROFESSIONAL_SUPPORT, URGENT_SUPPORT } from './content.js';

const INK = '#2e2637';
const MUTED = '#61596b';
const ACCENT = '#5d4287';
const LAVENDER = '#f0eaf8';

export function createReflectionReport(result) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const margin = 18;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const width = pageWidth - margin * 2;
  const bottom = pageHeight - 23;
  let y;

  doc.setLanguage('es-CO');
  doc.setCreationDate(result.date);
  doc.setProperties({ title: 'Alivio | Informe de reflexión personal', subject: 'Guía educativa y no diagnóstica', creator: 'Alivio' });

  function style(size = 10, color = INK, font = 'helvetica', weight = 'normal') {
    doc.setFont(font, weight);
    doc.setFontSize(size);
    doc.setTextColor(color);
  }

  function header(continued = false) {
    doc.setFillColor(LAVENDER);
    doc.rect(0, 0, pageWidth, continued ? 23 : 46, 'F');
    style(9, ACCENT, 'helvetica', 'bold');
    doc.text('ALIVIO   /   GUÍA DE DUELO', margin, 14);
    if (continued) { y = 33; return; }
    doc.setFillColor('#e6dcf3');
    doc.circle(pageWidth - 20, 9, 24, 'F');
    doc.setFillColor('#f7f2fc');
    doc.circle(pageWidth - 14, 3, 16, 'F');
    style(26, INK, 'times', 'normal');
    doc.text('Informe de reflexión personal', margin, 28);
    style(10, MUTED);
    doc.text(`${formatDate(result.date)}   ·   ${result.answered} de ${result.total} respuestas`, margin, 38);
    y = 56;
  }

  function ensureSpace(height) {
    if (y + height > bottom) {
      doc.addPage();
      header(true);
    }
  }

  function textLines(lines, start, x, leading) {
    lines.forEach((line, i) => doc.text(line, x, start + i * leading));
  }

  function paragraph(text, { size = 10.5, leading = 5, color = MUTED, x = margin, maxWidth = width, after = 2 } = {}) {
    style(size, color);
    const lines = doc.splitTextToSize(text, maxWidth);
    ensureSpace(lines.length * leading + after);
    style(size, color);
    textLines(lines, y, x, leading);
    y += lines.length * leading + after;
  }

  function section(title, height) {
    ensureSpace(height);
    style(14, INK, 'helvetica', 'bold');
    doc.text(title, margin, y);
    y += 7;
  }

  header();
  style(9, ACCENT, 'helvetica', 'bold');
  doc.text('LO QUE DESTACA EN TUS RESPUESTAS', margin, y);
  y += 9;
  style(22, INK, 'times', 'bold');
  doc.text(result.title, margin, y);
  y += 7;
  paragraph(result.summary);
  if (result.mode === 'mixed') paragraph(`Reacciones con puntuaciones similares: ${result.leading.map(({ label }) => label).join(', ')}.`, { size: 10 });
  y += 3;

  section('Perfil de respuestas', 61);
  paragraph(scoreDetails(result), { size: 9.5, leading: 4.3, after: 3 });
  for (const { phase, mean, count } of result.scores) {
    style(10, phase.color, 'helvetica', 'bold');
    doc.text(phase.label, margin, y);
    const barX = margin + 39;
    const barWidth = 61;
    doc.setFillColor(phase.tint);
    doc.roundedRect(barX, y - 2.6, barWidth, 2.7, 1, 1, 'F');
    if (mean > 0) {
      doc.setFillColor(phase.color);
      doc.roundedRect(barX, y - 2.6, barWidth * (mean / 3), 2.7, 1, 1, 'F');
    }
    style(9.5, MUTED);
    const value = `${formatScore(mean)}${result.answered < result.total ? `  ·  ${count} de 2 respuestas` : ''}`;
    doc.text(value, pageWidth - margin, y, { align: 'right' });
    y += 6.4;
  }
  y += 4;

  section('Recomendaciones para hoy', 26);
  for (const [index, tip] of result.tips.entries()) {
    style(10.5);
    const lines = doc.splitTextToSize(tip.text, width - 15);
    const label = `${tip.title}${tip.phase && result.mode === 'mixed' ? ` · ${tip.phase.label}` : ''}`;
    style(10.5, INK, 'helvetica', 'bold');
    const labelLines = doc.splitTextToSize(label, width - 15);
    const height = 6 + labelLines.length * 4.2 + lines.length * 4.3;
    ensureSpace(height + 3);
    doc.setFillColor('#f7f3fa');
    doc.roundedRect(margin, y - 3.8, width, height, 2, 2, 'F');
    style(9, ACCENT, 'helvetica', 'bold');
    doc.text(`0${index + 1}`, margin + 4, y + 1);
    style(10.5, INK, 'helvetica', 'bold');
    textLines(labelLines, y + 1, margin + 12, 4.2);
    style(10.5, MUTED);
    textLines(lines, y + 2 + labelLines.length * 4.2, margin + 12, 4.3);
    y += height + 2.5;
  }
  y += 5;

  section('Cómo leer este informe', 43);
  paragraph(`${LIMITS} ${NONLINEAR}`, { size: 9.5, leading: 4.2 });
  paragraph(`${PROFESSIONAL_SUPPORT} ${URGENT_SUPPORT} Para escucha y orientación en Bogotá, llama al 106.`, { size: 9.5, leading: 4.2 });
  paragraph(`Fuente: ${BOOK.author}, ${BOOK.title}. Edición digital en español (2017), caps. 3–8 y cap. 11, p. 202.`, { size: 8.8, leading: 3.9 });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor('#e7ddee');
    doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
    style(8.5, MUTED);
    doc.text('Alivio · Informe personal', margin, pageHeight - 10);
    doc.text(`${i} / ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  }

  return doc;
}

export function downloadReflectionReport(result) {
  const date = result.date;
  const stamp = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
  return createReflectionReport(result).save(`alivio-informe-${stamp}.pdf`, { returnPromise: true });
}
