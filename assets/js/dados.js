/* Armazenamento local. Este arquivo não envia informações para um servidor. */
(function (global) {
  'use strict';
  const KEY = 'aprender-digital-v1';
  const IDS = ['dispositivos', 'internet', 'arquivos', 'comunicacao', 'seguranca', 'cotidiano'];
  const empty = () => ({
    version: 1,
    completed: [],
    activities: {},
    quiz: Array(6).fill(null),
    feedback: [],
    preferences: {
      font: 0,
      contrast: false
    }
  });
  let available = true;

  // Valida dados antes de usar um registro antigo ou alterado no navegador.
  function sanitize(value) {
    const state = empty();
    if (!value || typeof value !== 'object') return state;
    state.completed = [...new Set((Array.isArray(value.completed) ? value.completed : []).filter(id => IDS.includes(id)))];
    for (const id of IDS) {
      const answer = value.activities && value.activities[id];
      if (Number.isInteger(answer) && answer >= 0 && answer < 3) state.activities[id] = answer;
    }
    state.quiz = Array.from({
      length: 6
    }, (_, i) => {
      const answer = Array.isArray(value.quiz) ? value.quiz[i] : null;
      return Number.isInteger(answer) && answer >= 0 && answer < 3 ? answer : null;
    });
    state.feedback = (Array.isArray(value.feedback) ? value.feedback : []).filter(item =>
      item && ['celular', 'computador', 'tablet'].includes(item.device) &&
      Number.isInteger(item.navigation) && item.navigation >= 1 && item.navigation <= 5 &&
      Number.isInteger(item.clarity) && item.clarity >= 1 && item.clarity <= 5 && ['sozinho', 'pouca-ajuda', 'muita-ajuda'].includes(item.support)
    ).slice(-100).map(item => ({
      device: item.device,
      navigation: item.navigation,
      clarity: item.clarity,
      support: item.support,
      suggestion: typeof item.suggestion === 'string' ? item.suggestion.slice(0, 600) : ''
    }));
    if (value.preferences) {
      state.preferences.font = [0, 1, 2].includes(value.preferences.font) ? value.preferences.font : 0;
      state.preferences.contrast = value.preferences.contrast === true;
    }
    return state;
  }

  function read() {
    try {
      return sanitize(JSON.parse(global.localStorage.getItem(KEY)));
    } catch (error) {
      if (!(error instanceof SyntaxError)) available = false;
      return empty();
    }
  }

  function write(state) {
    try {
      global.localStorage.setItem(KEY, JSON.stringify(sanitize(state)));
      available = true;
      return true;
    } catch {
      available = false;
      return false;
    }
  }

  function clear() {
    try {
      global.localStorage.removeItem(KEY);
      return true;
    } catch {
      available = false;
      return false;
    }
  }

  function score(answers, questions) {
    return questions.reduce((total, question, i) => total + (answers[i] === question.correct ? 1 : 0), 0);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    } [char]));
  }
  // Bloqueia fórmulas ao abrir avaliações CSV em planilhas.
  function csvCell(value) {
    let text = String(
      value === null || value === undefined ? '' : value
    );

    if (/^[\s]*[=+@-]/.test(text)) {
      text = "'" + text;
    }

    return '"' + text.replace(/"/g, '""') + '"';
  }

  function feedbackCSV(feedback) {
    const rows = [
      ['Registro local', 'Dispositivo', 'Navegação (1 a 5)', 'Clareza (1 a 5)', 'Ajuda necessária', 'Sugestão']
    ];
    feedback.forEach((item, i) => rows.push([i + 1, item.device, item.navigation, item.clarity, item.support, item.suggestion]));
    return '\uFEFF' + rows.map(row => row.map(csvCell).join(';')).join('\r\n');
  }
  global.ADStore = {
    empty,
    sanitize,
    read,
    write,
    clear,
    score,
    escapeHTML,
    feedbackCSV,
    available: () => available
  };
})(typeof window !== 'undefined' ? window : globalThis);