// ── Shared utilities for all assessments ──

// Handle option selection with visual feedback
function initOptions() {
  document.querySelectorAll('.options').forEach(optGroup => {
    optGroup.querySelectorAll('.option-label').forEach(label => {
      label.addEventListener('click', () => {
        // Deselect siblings
        optGroup.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
        label.querySelector('input').checked = true;
        // Mark question answered
        label.closest('.question-block')?.classList.add('answered');
        updateScore();
      });
    });
  });

  document.querySelectorAll('.tf-options').forEach(optGroup => {
    optGroup.querySelectorAll('.tf-label').forEach(label => {
      label.addEventListener('click', () => {
        optGroup.querySelectorAll('.tf-label').forEach(l => l.classList.remove('selected'));
        label.classList.add('selected');
        label.querySelector('input').checked = true;
        label.closest('.question-block')?.classList.add('answered');
        updateScore();
      });
    });
  });
}

function getAnsweredCount() {
  const total = document.querySelectorAll('.question-block').length;
  const answered = document.querySelectorAll('.question-block.answered').length;
  return { answered, total };
}

function updateProgressNote() {
  const { answered, total } = getAnsweredCount();
  const note = document.getElementById('progress-note');
  if (note) {
    if (answered === total) {
      note.textContent = 'All questions answered';
      note.style.color = 'var(--success)';
    } else {
      note.textContent = `${answered} of ${total} answered`;
    }
  }
}

// Client info helpers
function getClientInfo() {
  return {
    name: document.getElementById('client-name')?.value || '—',
    age: document.getElementById('client-age')?.value || '—',
    date: document.getElementById('client-date')?.value || new Date().toLocaleDateString('en-IN'),
  };
}

// PDF generation using jsPDF
async function generatePDF(assessmentName, scoreText, interpretationText, subscales = null) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const info = getClientInfo();

  const margin = 20;
  const pageW = 210;
  const contentW = pageW - margin * 2;
  let y = margin;

  // Header
  doc.setFillColor(45, 95, 166);
  doc.rect(0, 0, pageW, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Psychological Assessment Report', margin, 12);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), pageW - margin, 12, { align: 'right' });

  y = 30;
  doc.setTextColor(26, 26, 26);

  // Assessment name
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(assessmentName, margin, y);
  y += 12;

  // Client info box
  doc.setFillColor(247, 246, 243);
  doc.roundedRect(margin, y, contentW, 22, 3, 3, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(122, 118, 112);
  doc.text('CLIENT', margin + 5, y + 7);
  doc.text('AGE', margin + contentW / 3, y + 7);
  doc.text('DATE', margin + (contentW / 3) * 2, y + 7);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 26);
  doc.text(info.name, margin + 5, y + 16);
  doc.text(String(info.age), margin + contentW / 3, y + 16);
  doc.text(info.date, margin + (contentW / 3) * 2, y + 16);
  y += 30;

  // Score box
  doc.setFillColor(237, 242, 251);
  doc.roundedRect(margin, y, contentW, 30, 3, 3, 'F');
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(45, 95, 166);
  doc.text(scoreText, margin + 10, y + 20);
  doc.setFontSize(12);
  doc.setTextColor(26, 26, 26);
  doc.text(interpretationText, margin + 10 + doc.getTextWidth(scoreText) + 8, y + 20);
  y += 40;

  // Subscales
  if (subscales && subscales.length) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(122, 118, 112);
    doc.text('SUBSCALE SCORES', margin, y);
    y += 6;
    subscales.forEach((s, i) => {
      const x = margin + (i % 3) * (contentW / 3);
      if (i % 3 === 0 && i > 0) y += 16;
      doc.setFillColor(247, 246, 243);
      doc.roundedRect(x, y, contentW / 3 - 4, 14, 2, 2, 'F');
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(26, 26, 26);
      doc.text(String(s.score), x + 5, y + 9);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(122, 118, 112);
      doc.text(s.name, x + 5, y + 13);
    });
    y += 24;
  }

  // Question responses
  y += 4;
  doc.setDrawColor(228, 226, 220);
  doc.line(margin, y, margin + contentW, y);
  y += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(122, 118, 112);
  doc.text('ITEM RESPONSES', margin, y);
  y += 8;

  document.querySelectorAll('.question-block').forEach((block, idx) => {
    const qText = block.querySelector('.question-text')?.textContent || '';
    const selected = block.querySelector('.option-label.selected, .tf-label.selected');
    const responseText = selected ? selected.textContent.trim() : 'Not answered';
    const score = selected?.querySelector('input')?.value || '';

    if (y > 270) { doc.addPage(); y = margin; }

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(45, 95, 166);
    doc.text(`Q${idx + 1}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(26, 26, 26);
    const qLines = doc.splitTextToSize(qText, contentW - 20);
    doc.text(qLines, margin + 10, y);
    y += qLines.length * 4 + 2;

    doc.setTextColor(122, 118, 112);
    const rLines = doc.splitTextToSize(`→ ${responseText}${score !== '' ? ' [' + score + ']' : ''}`, contentW - 10);
    doc.text(rLines, margin + 10, y);
    y += rLines.length * 4 + 4;
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(180, 180, 180);
    doc.text(`Page ${i} of ${pageCount} · Generated by Psych Assessments`, pageW / 2, 292, { align: 'center' });
  }

  doc.save(`${assessmentName.replace(/\s+/g, '_')}_${info.name || 'client'}_${info.date?.replace(/\//g, '-') || 'report'}.pdf`);
}

// Init date field to today
function initDateField() {
  const dateField = document.getElementById('client-date');
  if (dateField && !dateField.value) {
    const today = new Date();
    dateField.value = today.toISOString().split('T')[0];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initOptions();
  initDateField();
});
