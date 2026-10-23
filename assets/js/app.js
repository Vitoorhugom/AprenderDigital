/* Interface e interações. HTML + CSS + JavaScript puro, sem dependências. */
(function () {
  'use strict';
  const {lessons, quiz} = window.ADContent;
  const Store = window.ADStore;
  const esc = Store.escapeHTML;
  const main = document.getElementById('conteudo');
  let state = Store.read();
  let quizStarted = state.quiz.some(answer => answer !== null);
  let quizIndex = Math.max(0, state.quiz.findIndex(answer => answer === null));
  let quizMode = 'auto';
  let feedbackMode = 'form';
  let toastTimer;
  let pendingReset = null;

  // Ícones vetoriais próprios, sem imagens ou fontes externas.
  function icon(name) {
    const paths = {
      arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      book: '<path d="M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z"/><path d="M12 6v15"/>',
      monitor: '<rect x="2" y="3" width="15" height="12" rx="2"/><path d="M9 15v5M5 20h8"/><rect x="17" y="9" width="5" height="12" rx="1"/>',
      globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 7h14M5 17h14"/>',
      folder: '<path d="M3 6a2 2 0 0 1 2-2h5l3 3h6a2 2 0 0 1 2 2v10H3Z"/><path d="M3 10h18"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
      shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
      sparkles: '<path d="m12 3 2 6 6 3-6 2-2 7-3-7-6-2 6-3Zm7-1 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
      download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
      play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
      external: '<path d="M14 3h7v7m0-7L10 14M10 5H4v15h15v-6"/>',
      heart: '<path d="M12 20S2 14 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 12-10 12Z"/>'
    };
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + (paths[name] || paths.book) + '</svg>';
  }
  function save() {
    Store.write(state);
    document.getElementById('storage-warning').hidden = Store.available();
  }
  function notify(message) {
    const toast = document.getElementById('toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => {toast.hidden = true;}, 4500);
  }
  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], {type}));
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function completed(id) {return state.completed.includes(id);}
  function allQuizAnswered() {return quiz.every((_, index) => Number.isInteger(state.quiz[index]));}
  function nextLesson() {return lessons.find(lesson => !completed(lesson.id)) || lessons[0];}
  function countAnswers() {return state.quiz.filter(answer => Number.isInteger(answer)).length;}
  function pageHeading(label, title, description) {
    return `<div class="page-heading"><div class="eyebrow">${esc(label)}</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div>`;
  }
  function ring() {
    const percent = Math.round(state.completed.length / lessons.length * 100);
    return `<div class="progress-ring" aria-label="${percent}% das aulas concluídas"><svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="25" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="30" cy="30" r="25" fill="none" stroke="var(--green)" stroke-width="5" stroke-dasharray="${percent * 1.571} 157.1" stroke-linecap="round"/></svg><span>${percent}%</span></div>`;
  }
  function card(lesson, index) {
    return `<article class="course-card"><div class="card-top"><span class="icon-box ${lesson.color}">${icon(lesson.icon)}</span>${completed(lesson.id) ? '<span class="status-chip">Concluída</span>' : `<span class="lesson-number">AULA ${String(index + 1).padStart(2, '0')}</span>`}</div><h3>${esc(lesson.title)}</h3><p>${esc(lesson.description)}</p><div class="card-bottom"><span class="duration">${icon('clock')} Cerca de ${lesson.time}</span><a href="#aula/${lesson.id}" aria-label="${completed(lesson.id) ? 'Rever' : 'Abrir'} aula ${index + 1}: ${esc(lesson.title)}">${completed(lesson.id) ? 'Rever aula' : 'Começar'} ${icon('arrow')}</a></div></article>`;
  }
  function renderHome() {
    const next = nextLesson();
    const allDone = state.completed.length === lessons.length;
    main.innerHTML = `<section class="hero"><div><div class="eyebrow"><span class="eyebrow-dot"></span> TECNOLOGIA PARA TODOS</div><h1>O mundo digital.<br><span>No seu ritmo.</span></h1><p>Aprenda a usar o computador, o celular e a internet com mais confiança. Um passo simples de cada vez.</p><div class="button-row"><a class="button" href="#aula/${next.id}">${state.completed.length && !allDone ? 'Continuar aprendendo' : 'Começar a aprender'} ${icon('arrow')}</a><a class="button text" href="#aulas">Conhecer as aulas</a></div><div class="mini-features"><span>${icon('check')} Gratuito e sem cadastro</span><span>${icon('monitor')} No celular ou computador</span></div></div><div class="hero-image"><img src="assets/img/aprender.svg" alt="Computador com uma aula aberta e celular com uma atividade concluída" width="560" height="440"><div class="hero-caption">${icon('heart')} <span>Você aprende. <strong>A confiança cresce.</strong></span></div></div></section>
      <section class="progress-strip" aria-labelledby="progress-title">${ring()}<div class="strip-copy"><h2 id="progress-title">${allDone ? 'Você concluiu as seis aulas!' : state.completed.length ? 'Cada passo conta. Continue de onde parou.' : 'Seu primeiro passo começa aqui.'}</h2><p>${state.completed.length} de ${lessons.length} aulas concluídas neste navegador.</p></div><a class="button secondary small" href="${allDone ? '#praticar' : '#aula/' + next.id}">${allDone ? 'Praticar o que aprendi' : state.completed.length ? 'Continuar minha trilha' : 'Ir para a primeira aula'} ${icon('arrow')}</a></section>
      <section aria-labelledby="home-lessons"><div class="section-heading"><div><h2 id="home-lessons">O básico que faz a diferença</h2><p>Escolha um assunto ou siga as aulas na ordem.</p></div><span class="section-label">6 aulas · do primeiro clique ao dia a dia</span></div><div class="course-grid">${lessons.map(card).join('')}</div></section>
      <section class="learn-flow" aria-label="Como aprender"><div class="flow-item"><span class="flow-num">1</span><div><h3>Aprenda com calma</h3><p>Textos curtos e exemplos para acompanhar no seu ritmo.</p></div></div><div class="flow-item"><span class="flow-num">2</span><div><h3>Experimente na prática</h3><p>Atividades simples, com explicação de cada resposta.</p></div></div><div class="flow-item"><span class="flow-num">3</span><div><h3>Conte como foi</h3><p>Sua avaliação ajuda a melhorar as próximas experiências.</p></div></div></section>
      <section class="help-banner"><div><h2>Aprender também é perguntar.</h2><p>Está com dificuldade? Veja como usar as aulas e ajustar a leitura.</p></div><a class="button" href="#ajuda">Preciso de ajuda ${icon('arrow')}</a></section>`;
  }
  function renderLessons() {
    main.innerHTML = pageHeading('SUA TRILHA DE APRENDIZADO', 'Por onde vamos começar?', 'Você pode seguir a ordem ou escolher o assunto que mais precisa agora.') + `<div class="search-area"><label class="sr-only" for="lesson-search">Buscar aulas por assunto</label>${icon('search')}<input id="lesson-search" type="search" placeholder="Buscar por assunto, como e-mail ou celular" autocomplete="off"></div><p class="search-status" id="search-status" aria-live="polite">6 aulas disponíveis</p><div class="course-grid" id="course-results">${lessons.map(card).join('')}</div>`;
  }
  function activityForm(lesson) {
    const answer = state.activities[lesson.id];
    const q = lesson.question;
    const hasAnswer = Number.isInteger(answer);
    return `<section class="question-box" aria-labelledby="activity-title"><h2 id="activity-title">Vamos conferir?</h2><form id="lesson-question" data-lesson="${lesson.id}"><fieldset><legend>${esc(q.text)}</legend><div class="choices">${q.options.map((option, i) => `<label class="choice"><input type="radio" name="answer" value="${i}" required ${hasAnswer && answer === i ? 'checked' : ''}><span>${esc(option)}</span></label>`).join('')}</div></fieldset><button class="button small" type="submit">${hasAnswer ? 'Conferir novamente' : 'Conferir resposta'}</button><div id="activity-feedback" aria-live="polite">${hasAnswer ? answerFeedback(answer, q) : ''}</div></form></section>`;
  }
  function answerFeedback(answer, question) {
    const isCorrect = answer === question.correct;
    return `<div class="feedback ${isCorrect ? '' : 'incorrect'}"><strong>${isCorrect ? 'Isso mesmo!' : 'Vamos aprender com essa resposta.'}</strong>${esc(question.explanation)}${isCorrect ? '' : '<br>Você pode tentar novamente.'}</div>`;
  }
  function exercise(lesson) {
    if (!lesson.exercise) return '';
    if (lesson.exercise.type === 'typing') return `<div class="practice-box"><h3>Treine a digitação</h3><p>Digite a frase abaixo. Se errar, apague e tente de novo.</p><code>${esc(lesson.exercise.prompt)}</code><form id="typing-form"><div class="field"><label for="typing-text">Sua tentativa</label><input id="typing-text" name="practice" type="text" maxlength="200" required autocomplete="off" spellcheck="false"></div><button class="button secondary small" type="submit">Conferir digitação</button><div class="exercise-feedback" id="typing-feedback" role="status"></div></form></div>`;
    if (lesson.exercise.type === 'download') return `<div class="practice-box"><h3>Um arquivo para treinar</h3><p>Baixe uma lista fictícia em formato de texto. Nenhum dado pessoal é necessário.</p><button class="button secondary small" data-action="practice-download">${icon('download')} Baixar arquivo de treino</button></div>`;
    if (lesson.exercise.type === 'email') return `<div class="practice-box"><h3>Simulação de e-mail</h3><p>Use apenas informações fictícias. Esta atividade não envia mensagens.</p><form id="email-practice"><div class="field"><label for="email-to">Para (endereço fictício)</label><input id="email-to" type="text" value="colega@example.com" readonly></div><div class="field"><label for="email-subject">Assunto</label><input id="email-subject" name="subject" maxlength="100" required placeholder="Dúvida sobre a aula"></div><div class="field"><label for="email-message">Mensagem</label><textarea id="email-message" name="message" maxlength="500" required placeholder="Olá! Estou praticando como escrever um e-mail."></textarea></div><button class="button secondary small" type="submit">Conferir mensagem</button><div class="exercise-feedback" id="email-feedback" role="status"></div></form></div>`;
    return '';
  }
  function video(lesson) {
    if (!lesson.video) return '';
    const item = lesson.video;
    return `<section class="video-box" aria-labelledby="video-title"><h2 id="video-title">Veja também: ${esc(item.title)}</h2><div id="video-container"><div class="video-cover">${icon('shield')}<span>Uma dica em vídeo para proteger suas contas</span><button class="button small" data-action="load-video">${icon('play')} Carregar vídeo</button></div></div><p class="source-note">Vídeo: Cidadão na Rede / NIC.br · CC BY-ND. Carregado do site do NIC.br apenas ao tocar no botão. Requer internet. <a href="${item.page}" target="_blank" rel="noopener noreferrer">Abrir na fonte (nova aba)</a>.</p><details><summary>Resumo do vídeo em texto</summary><p>${esc(item.summary)}</p></details></section>`;
  }
  function renderLesson(id) {
    const lesson = lessons.find(item => item.id === id);
    if (!lesson) return renderNotFound();
    const index = lessons.indexOf(lesson);
    main.innerHTML = `<div class="breadcrumb"><a href="#aulas">Todas as aulas</a><span aria-hidden="true">/</span><span>Aula ${index + 1}</span></div><div class="lesson-layout"><aside class="lesson-sidebar" aria-label="Outras aulas"><h2>Sua trilha de aprendizado</h2><ol>${lessons.map((item, i) => `<li><a href="#aula/${item.id}" ${item.id === id ? 'class="active" aria-current="page"' : ''}><span class="sidebar-number ${completed(item.id) ? 'done' : ''}">${completed(item.id) ? '✓' : i + 1}</span><span>${esc(item.title)}${completed(item.id) ? '<span class="sr-only"> — concluída</span>' : ''}</span></a></li>`).join('')}</ol></aside><article class="lesson-article"><div class="lesson-meta"><span class="icon-box ${lesson.color}">${icon(lesson.icon)}</span><span>AULA ${String(index + 1).padStart(2, '0')} · Cerca de ${lesson.time}</span></div><h1>${esc(lesson.title)}</h1><p class="lesson-intro">${esc(lesson.introduction)}</p>${lesson.sections.map(section => `<section><h2>${esc(section.title)}</h2><p>${esc(section.text)}</p></section>`).join('')}<div class="note"><strong>Uma dica para você</strong><p>${esc(lesson.tip)}</p></div><section><h2>Agora experimente</h2><ol class="step-list">${lesson.steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>${exercise(lesson)}</section>${video(lesson)}${lesson.resource ? `<p><a class="inline-link" href="${lesson.resource.url}" target="_blank" rel="noopener noreferrer">${esc(lesson.resource.label)} ${icon('external')}<span class="sr-only"> (nova aba)</span></a></p>` : ''}${activityForm(lesson)}<div class="lesson-actions"><button class="button ${completed(id) ? 'secondary' : ''}" data-action="complete" data-lesson="${id}" aria-pressed="${completed(id)}">${icon('check')} ${completed(id) ? 'Concluída · desfazer marcação' : 'Marcar aula como concluída'}</button><a class="button text" href="${index < lessons.length - 1 ? '#aula/' + lessons[index + 1].id : '#praticar'}">${index < lessons.length - 1 ? 'Próxima aula' : 'Praticar o que aprendi'} ${icon('arrow')}</a></div></article></div>`;
  }
  function renderQuiz() {
    main.innerHTML = `<div class="narrow">${pageHeading('APRENDER FAZENDO', 'Vamos praticar?', 'Seis perguntas sobre situações do dia a dia. Leia com calma: errar também faz parte do aprendizado.')}<div id="quiz-content"></div></div>`;
    const target = document.getElementById('quiz-content');
    if (allQuizAnswered() && quizMode !== 'questions') {
      target.innerHTML = quizResult();
      return;
    }
    if (!quizStarted) {
      target.innerHTML = `<div class="panel"><span class="icon-box sage">${icon('book')}</span><h2 style="margin-top:22px">O que você já aprendeu?</h2><p>Escolha uma resposta em cada pergunta e receba uma explicação. Você pode refazer a atividade quando quiser.</p><p>As respostas ficam neste navegador. Não é preciso informar nome, e-mail ou senha.</p><button class="button" data-action="start-quiz">Começar atividade ${icon('arrow')}</button></div>`;
      return;
    }
    const q = quiz[quizIndex];
    const answer = state.quiz[quizIndex];
    const answered = Number.isInteger(answer);
    target.innerHTML = `<section class="panel"><div class="quiz-top"><span>Pergunta ${quizIndex + 1} de ${quiz.length}</span><span>${countAnswers()} respondida${countAnswers() !== 1 ? 's' : ''}</span></div><div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${countAnswers() / quiz.length * 100}%"></div></div><form id="quiz-form"><fieldset><legend class="quiz-question">${esc(q.text)}</legend><div class="choices">${q.options.map((option, i) => `<label class="choice"><input type="radio" name="answer" value="${i}" required ${answer === i ? 'checked' : ''}><span>${esc(option)}</span></label>`).join('')}</div></fieldset><button class="button" type="submit">${answered ? 'Conferir novamente' : 'Conferir resposta'}</button><div id="quiz-feedback" aria-live="polite">${answered ? answerFeedback(answer, q) : ''}</div></form><div class="quiz-bottom"><button class="button text" data-action="previous-question" ${quizIndex === 0 ? 'disabled' : ''}>Voltar à pergunta anterior</button><button class="button secondary" data-action="next-question" ${!answered ? 'disabled' : ''}>${quizIndex === quiz.length - 1 ? 'Ver meu resultado' : 'Próxima pergunta'} ${icon('arrow')}</button></div></section>`;
  }
  function quizResult() {
    const points = Store.score(state.quiz, quiz);
    return `<section class="panel"><div class="result-summary"><div class="result-score">${points} de ${quiz.length}</div><h2>Você terminou a atividade!</h2><p>${points === quiz.length ? 'Muito bem! Continue praticando essas habilidades no seu dia a dia.' : 'Revise as explicações abaixo. Você pode voltar às aulas e tentar outra vez.'}</p></div><div class="button-row"><a class="button" href="#avaliar">Contar como foi ${icon('arrow')}</a><button class="button secondary" data-action="reset-quiz">Refazer atividade</button></div></section><section class="panel"><h2>Vamos revisar suas respostas</h2>${quiz.map((q, i) => `<div class="answer-review"><h3>${i + 1}. ${esc(q.text)}</h3><p class="${state.quiz[i] === q.correct ? 'correct-text' : 'incorrect-text'}"><strong>${state.quiz[i] === q.correct ? 'Resposta correta' : 'Ponto para revisar'}:</strong> ${esc(q.options[state.quiz[i]])}</p><p>${esc(q.explanation)}</p><a class="inline-link" href="#aula/${lessons[i].id}">Rever a aula ${icon('arrow')}</a></div>`).join('')}</section>`;
  }
  function renderProgress() {
    const answered = countAnswers();
    main.innerHTML = pageHeading('CADA PASSO CONTA', 'Seu progresso', 'Este resumo mostra apenas o que foi feito neste navegador e neste aparelho.') + `<div class="metric-grid"><div class="metric"><strong>${state.completed.length}<span class="sr-only"> de </span><small aria-hidden="true">/${lessons.length}</small></strong><span>Aulas concluídas</span></div><div class="metric"><strong>${answered}<span class="sr-only"> de </span><small aria-hidden="true">/${quiz.length}</small></strong><span>Perguntas respondidas</span></div><div class="metric"><strong>${allQuizAnswered() ? Store.score(state.quiz, quiz) + '/6' : '—'}</strong><span>${allQuizAnswered() ? 'Acertos na atividade' : 'Resultado ao terminar'}</span></div></div><section class="panel"><h2>Sua trilha</h2><ul class="progress-list">${lessons.map(lesson => `<li><span class="icon-box ${lesson.color}">${icon(lesson.icon)}</span><span class="title">${esc(lesson.title)}</span><span class="status-chip">${completed(lesson.id) ? 'Concluída' : 'A fazer'}</span><a href="#aula/${lesson.id}">${completed(lesson.id) ? 'Rever' : 'Abrir'}<span class="sr-only"> ${esc(lesson.title)}</span></a></li>`).join('')}</ul></section><div class="button-row"><a class="button" href="${allQuizAnswered() ? '#avaliar' : '#praticar'}">${allQuizAnswered() ? 'Avaliar a experiência' : 'Ir para a atividade'} ${icon('arrow')}</a><button class="button secondary" data-action="export-progress">${icon('download')} Baixar meu resumo</button></div><div class="privacy-note"><p>Trocar de aparelho, limpar os dados do site ou usar navegação privada pode fazer você perder o progresso. Não há sincronização entre aparelhos.</p><button class="button text" data-action="reset-all">Apagar progresso e avaliações deste navegador</button></div>`;
  }
  function ratings(name, title) {
    return `<fieldset><legend>${title}</legend><div class="rating-row">${[1, 2, 3, 4, 5].map(i => `<label class="rating-label"><input type="radio" name="${name}" value="${i}" required><span>${i}<span class="sr-only"> de 5</span></span></label>`).join('')}</div><div class="rating-scale"><span>1 = Muito difícil</span><span>5 = Muito fácil</span></div></fieldset>`;
  }
  function feedbackAside() {
    const last = state.feedback[state.feedback.length - 1];
    return `<aside class="feedback-aside"><h2>Seu retorno faz diferença.</h2><p>A avaliação ajuda a identificar o que ficou claro e o que pode melhorar.</p><p><strong>As respostas ficam neste navegador.</strong> Para entregar sua avaliação ao responsável pelo projeto, baixe o arquivo ou mostre esta tela. Não há envio automático.</p><p>Não escreva nome, telefone, e-mail ou outros dados pessoais na sugestão.</p><button class="button secondary small" data-action="export-feedback" ${state.feedback.length ? '' : 'disabled'}>${icon('download')} Baixar avaliações (CSV)</button><button class="button secondary small" data-action="export-feedback-text" ${state.feedback.length ? '' : 'disabled'}>${icon('download')} Baixar avaliações (texto)</button><p class="field-note">${state.feedback.length} ${state.feedback.length === 1 ? 'avaliação registrada' : 'avaliações registradas'} neste navegador.</p>${last ? `<div class="feedback-record"><h3>Última avaliação</h3><dl><dt>Dispositivo</dt><dd>${esc(last.device)}</dd><dt>Facilidade de navegação</dt><dd>${last.navigation} de 5</dd><dt>Facilidade de compreensão</dt><dd>${last.clarity} de 5</dd><dt>Ajuda necessária</dt><dd>${supportLabel(last.support)}</dd><dt>Sugestão</dt><dd>${esc(last.suggestion || 'Não informada.')}</dd></dl></div>` : ''}</aside>`;
  }
  function supportLabel(value) {return ({sozinho: 'Consegui usar sozinho(a)', 'pouca-ajuda': 'Precisei de pouca ajuda', 'muita-ajuda': 'Precisei de muita ajuda'})[value] || value;}
  function renderFeedback() {
    main.innerHTML = pageHeading('SUA OPINIÃO IMPORTA', 'Como foi aprender por aqui?', 'Conte sua experiência depois de utilizar as aulas e atividades. A avaliação não pede sua identificação.') + `<div class="feedback-layout">${feedbackMode === 'success' ? `<section class="panel"><span class="success-icon">${icon('check')}</span><h2>${Store.available() ? 'Avaliação salva neste navegador.' : 'Avaliação registrada nesta sessão.'}</h2><p>Obrigado por contar como foi. Seu retorno ajuda o responsável pelo projeto a melhorar a plataforma.</p><p>Para entregar a avaliação, baixe o arquivo e compartilhe com o responsável, ou mostre a tela durante o teste.</p><div class="button-row"><button class="button" data-action="export-feedback-text">${icon('download')} Baixar avaliação em texto</button><button class="button secondary" data-action="new-feedback">Registrar outra avaliação</button></div></section>` : `<form id="feedback-form" class="panel"><div class="field"><label for="device">Qual aparelho você usou? *</label><select id="device" name="device" required><option value="">Selecione uma opção</option><option value="celular">Celular</option><option value="computador">Computador</option><option value="tablet">Tablet</option></select></div>${ratings('navigation', 'Foi fácil encontrar e abrir as aulas? *')}${ratings('clarity', 'Foi fácil entender as explicações? *')}<fieldset><legend>Você precisou de ajuda para usar o site? *</legend><div class="choices">${['sozinho', 'pouca-ajuda', 'muita-ajuda'].map(value => `<label class="choice"><input type="radio" name="support" value="${value}" required><span>${supportLabel(value)}</span></label>`).join('')}</div></fieldset><div class="field"><label for="suggestion">O que podemos melhorar? (opcional)</label><textarea id="suggestion" name="suggestion" maxlength="600" placeholder="Conte uma dificuldade ou deixe uma sugestão, sem dados pessoais." aria-describedby="suggestion-note"></textarea><p class="field-note" id="suggestion-note">Até 600 caracteres. Campos com * são obrigatórios.</p></div><button type="submit" class="button">Salvar avaliação neste navegador ${icon('check')}</button></form>`}${feedbackAside()}</div>`;
  }
  function renderHelp() {
    const items = [
      ['Como começo?', 'Abra Aulas e escolha um tema. Leia o conteúdo, experimente a atividade e use “Marcar aula como concluída” ao terminar. Você pode voltar quando quiser.'],
      ['Preciso criar uma conta?', 'A plataforma não possui cadastro. As aulas, atividades e avaliações são gratuitas. Serviços externos citados nas aulas podem ter regras e cadastros próprios.'],
      ['Como aumento o texto?', 'Toque no botão A+ no topo. Cada toque alterna entre tamanho normal, ampliado e maior. O botão ao lado muda o contraste. Você também pode usar o zoom do seu navegador.'],
      ['Posso navegar pelo teclado?', 'Sim. Use Tab para avançar entre os links, botões e campos. Shift + Tab volta. Use Enter para abrir links e Enter ou espaço para ativar botões. Nas perguntas, as setas do teclado ajudam a escolher uma alternativa.'],
      ['Meu progresso aparece em outro aparelho?', 'Não. Os dados ficam apenas no navegador usado. Você pode baixar um resumo na página Meu progresso. Limpar os dados do navegador ou usar uma janela privada pode apagar os registros.'],
      ['Como entrego a avaliação ao responsável?', 'Depois de salvar a avaliação, use “Baixar avaliações” em texto ou CSV. Entregue esse arquivo ao responsável pelo projeto durante o teste. Você também pode mostrar o resultado na tela. Não existe envio automático.'],
      ['O vídeo não abriu. E agora?', 'Confira sua conexão com a internet. Use o link “Abrir na fonte” na aula de segurança. O resumo em texto continua disponível mesmo se o serviço de vídeo não carregar.'],
      ['O que significa o aviso sobre armazenamento?', 'Alguns navegadores bloqueiam o salvamento local. Você ainda pode usar as aulas, mas deve baixar os resultados antes de fechar a página. O site informa quando não consegue salvar.']
    ];
    main.innerHTML = `<div class="narrow">${pageHeading('PODE PERGUNTAR', 'Uma ajuda para cada passo', 'Veja como usar a plataforma e tornar a leitura mais confortável.')}<div class="panel">${items.map(([title, text]) => `<details><summary>${title}</summary><p>${text}</p></details>`).join('')}</div><a class="button" href="#aulas">Voltar para as aulas ${icon('arrow')}</a></div>`;
  }
  function renderAbout() {
    main.innerHTML = `<div class="narrow">${pageHeading('SOBRE O PROJETO', 'Conhecimento que aproxima', 'Uma plataforma introdutória para apoiar a inclusão digital e o aprendizado no cotidiano.')}<section class="panel"><h2>Por que este site existe?</h2><p>Aprender Digital é um protótipo acadêmico de atividade extensionista em Engenharia de Software. Seu objetivo é oferecer conteúdos básicos e observar como pessoas com diferentes experiências utilizam uma plataforma de ensino.</p><p>O projeto se relaciona ao ODS 4 — Educação de qualidade. Esta primeira versão será avaliada com participantes, e as dificuldades observadas orientarão melhorias.</p><h2>Como foi construído</h2><p>As páginas usam HTML, CSS e JavaScript. O progresso, as respostas das atividades e as avaliações ficam no armazenamento local do navegador. Não há sistema de contas, banco de dados externo ou envio automático de avaliações.</p><h2>Leitura e acessibilidade</h2><ul class="about-list"><li>Layout adaptável ao celular e ao computador.</li><li>Navegação por teclado e indicação visível de foco.</li><li>Textos ampliáveis, alto contraste e instruções junto aos campos.</li><li>Explicações das respostas e possibilidade de tentar novamente.</li></ul><h2>Materiais complementares</h2><p>Os textos e exercícios foram preparados para esta plataforma. As referências abaixo oferecem orientações adicionais. Os vídeos externos pertencem aos seus respectivos autores.</p><ul class="about-list"><li><a href="https://cartilha.cert.br/" target="_blank" rel="noopener noreferrer">Cartilha de Segurança para Internet — CERT.br (nova aba)</a></li><li><a href="https://cidadaonarede.nic.br/pt/videos/senhas-seguras" target="_blank" rel="noopener noreferrer">Senhas seguras — Cidadão na Rede / NIC.br (nova aba)</a></li><li><a href="https://cidadaonarede.nic.br/pt/videos/backup" target="_blank" rel="noopener noreferrer">Backup — Cidadão na Rede / NIC.br (nova aba)</a></li><li><a href="https://cidadaonarede.nic.br/pt/videos/cuide-de-seu-e-mail" target="_blank" rel="noopener noreferrer">Cuide de seu e-mail — Cidadão na Rede / NIC.br (nova aba)</a></li></ul><h2>Sobre seus dados</h2><p>A plataforma não pede nome, e-mail ou senha. Evite escrever dados pessoais nas avaliações. Ao carregar o vídeo ou abrir um link externo, você acessa serviços com políticas próprias. O provedor que hospeda o site também pode manter registros técnicos de acesso.</p><p>Você pode baixar seus registros ou apagá-los na página Meu progresso. A aplicação não verifica a identidade de quem responde: os registros são avaliações locais, não uma contagem comprovada de pessoas.</p></section><a class="button" href="#aulas">Conhecer as aulas ${icon('arrow')}</a></div>`;
  }
  function renderNotFound() {
    main.innerHTML = pageHeading('VAMOS ENCONTRAR O CAMINHO', 'Essa página não foi encontrada.', 'Escolha uma das aulas para continuar.') + '<a class="button" href="#aulas">Ver as aulas</a>';
  }
  function route(focus = true) {
    let hash = window.location.hash.slice(1) || 'inicio';
    if (hash === 'conteudo') {
      if (main.children.length) {main.focus(); return;}
      hash = 'inicio';
    }
    const [page, id] = hash.split('/');
    const routes = {inicio: renderHome, aulas: renderLessons, praticar: renderQuiz, progresso: renderProgress, avaliar: renderFeedback, ajuda: renderHelp, sobre: renderAbout};
    if (page === 'aula') renderLesson(id);
    else (routes[page] || renderNotFound)();
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === (page === 'aula' ? 'aulas' : page)) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const title = main.querySelector('h1');
    document.title = (page === 'inicio' ? 'Aprender Digital — Tecnologia no seu ritmo' : (title ? title.textContent : 'Aulas') + ' | Aprender Digital');
    if (focus) {
      main.focus({preventScroll: true});
      window.scrollTo({top: 0, behavior: 'instant'});
    }
  }
  function applyPreferences() {
    document.documentElement.style.setProperty('--font-size', ['16px', '18px', '20px'][state.preferences.font]);
    document.body.classList.toggle('high-contrast', state.preferences.contrast);
    document.getElementById('contrast-toggle').setAttribute('aria-pressed', String(state.preferences.contrast));
    document.getElementById('font-toggle').setAttribute('aria-label', 'Alterar tamanho do texto. Atual: ' + ['normal', 'ampliado', 'maior'][state.preferences.font]);
  }
  function askReset(kind) {
    pendingReset = kind;
    const dialog = document.getElementById('confirm-dialog');
    document.getElementById('confirm-title').textContent = kind === 'quiz' ? 'Refazer a atividade?' : 'Apagar os dados deste navegador?';
    document.getElementById('confirm-description').textContent = kind === 'quiz' ? 'Suas respostas e o resultado da atividade serão substituídos. As aulas concluídas e avaliações serão mantidas.' : 'Isso apaga o progresso, as respostas e as avaliações desta plataforma somente neste navegador. Baixe as avaliações que deseja guardar antes de continuar.';
    document.getElementById('confirm-accept').textContent = kind === 'quiz' ? 'Refazer atividade' : 'Apagar dados';
    if (typeof dialog.showModal === 'function') {dialog.showModal(); document.getElementById('confirm-cancel').focus();}
    else if (window.confirm(document.getElementById('confirm-description').textContent)) performReset();
  }
  function performReset() {
    if (pendingReset === 'quiz') {
      state.quiz = Array(quiz.length).fill(null); quizIndex = 0; quizStarted = true; quizMode = 'questions'; save(); renderQuiz();
    } else if (pendingReset === 'all') {
      const preferences = state.preferences;
      Store.clear(); state = Store.empty(); state.preferences = preferences; save();
      quizIndex = 0; quizStarted = false; quizMode = 'auto'; feedbackMode = 'form';
      route(); notify(Store.available() ? 'Os dados da plataforma foram apagados deste navegador.' : 'Dados desta sessão apagados. Não foi possível acessar o armazenamento do navegador.');
    }
    pendingReset = null;
    main.focus({preventScroll: true});
  }
  function feedbackText() {
    return 'APRENDER DIGITAL — AVALIAÇÕES LOCAIS\nSem identificação dos participantes. Registros não enviados automaticamente.\n\n' + state.feedback.map((item, i) => `Registro local ${i + 1}\nDispositivo: ${item.device}\nFacilidade de navegação: ${item.navigation}/5\nFacilidade de compreensão: ${item.clarity}/5\nAjuda: ${supportLabel(item.support)}\nSugestão: ${item.suggestion || 'Não informada.'}`).join('\n\n') + '\n';
  }

  // Eventos delegados continuam funcionando quando uma página é renderizada.
  main.addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action === 'complete') {
      const id = button.dataset.lesson;
      state.completed = completed(id) ? state.completed.filter(item => item !== id) : [...state.completed, id];
      save();
      const scrollY = window.scrollY;
      renderLesson(id);
      main.querySelector('[data-action="complete"]').focus({preventScroll: true});
      window.scrollTo({top: scrollY, behavior: 'instant'});
      notify(completed(id) ? 'Aula marcada como concluída.' : 'Marcação de conclusão removida.');
    }
    if (action === 'start-quiz') {quizStarted = true; quizMode = 'questions'; quizIndex = Math.max(0, state.quiz.findIndex(answer => answer === null)); renderQuiz(); main.focus();}
    if (action === 'previous-question' && quizIndex > 0) {quizIndex--; quizMode = 'questions'; renderQuiz(); main.focus();}
    if (action === 'next-question' && Number.isInteger(state.quiz[quizIndex])) {
      if (quizIndex < quiz.length - 1) {quizIndex++; quizMode = 'questions';} else {quizMode = 'result';}
      renderQuiz(); main.focus();
    }
    if (action === 'reset-quiz') askReset('quiz');
    if (action === 'reset-all') askReset('all');
    if (action === 'new-feedback') {feedbackMode = 'form'; renderFeedback(); document.getElementById('device').focus();}
    if (action === 'export-feedback' && state.feedback.length) download('avaliacoes-aprender-digital.csv', Store.feedbackCSV(state.feedback), 'text/csv;charset=utf-8');
    if (action === 'export-feedback-text' && state.feedback.length) download('avaliacoes-aprender-digital.txt', feedbackText(), 'text/plain;charset=utf-8');
    if (action === 'export-progress') {
      const text = 'APRENDER DIGITAL — RESUMO DESTE NAVEGADOR\n\nAulas concluídas: ' + state.completed.length + '/6\n' + lessons.map(lesson => (completed(lesson.id) ? '[Concluída] ' : '[A fazer] ') + lesson.title).join('\n') + '\n\nAtividade: ' + countAnswers() + '/6 perguntas respondidas.\n' + (allQuizAnswered() ? 'Acertos: ' + Store.score(state.quiz, quiz) + '/6\n' : 'Resultado ainda não concluído.\n') + '\nEste resumo é local e não identifica uma pessoa.\n';
      download('meu-progresso-aprender-digital.txt', text, 'text/plain;charset=utf-8');
    }
    if (action === 'practice-download') download('treino-aprender-digital.txt', 'Meu arquivo de treino\n\nLista fictícia para praticar:\n1. Abrir uma aula\n2. Encontrar o arquivo baixado\n3. Organizar a pasta Estudos\n\nEste arquivo não contém dados pessoais.\n', 'text/plain;charset=utf-8');
    if (action === 'load-video') {
      const lesson = lessons.find(item => item.video);
      const container = document.getElementById('video-container');
      container.innerHTML = `<video controls playsinline preload="metadata" aria-label="Vídeo Senhas seguras, do NIC.br"><source src="${lesson.video.url}" type="video/mp4"><p>Seu navegador não reproduziu o vídeo. Use o link da fonte abaixo.</p></video>`;
      const player = container.querySelector('video');
      player.addEventListener('error', () => notify('O vídeo não carregou. Use o link da fonte ou leia o resumo em texto.'));
      player.focus();
    }
  });
  main.addEventListener('input', event => {
    if (event.target.id !== 'lesson-search') return;
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize(event.target.value.trim());
    const filtered = lessons.filter(lesson => normalize(lesson.title + ' ' + lesson.description + ' ' + lesson.sections.map(section => section.text).join(' ')).includes(query));
    document.getElementById('course-results').innerHTML = filtered.length ? filtered.map(lesson => card(lesson, lessons.indexOf(lesson))).join('') : '<p class="empty-state">Nenhuma aula encontrada. Tente uma palavra como celular, internet ou arquivos.</p>';
    document.getElementById('search-status').textContent = filtered.length + (filtered.length === 1 ? ' aula encontrada' : ' aulas encontradas');
  });
  main.addEventListener('submit', event => {
    const form = event.target;
    event.preventDefault();
    if (!form.checkValidity()) {form.reportValidity(); return;}
    const values = new FormData(form);
    if (form.id === 'lesson-question') {
      const lesson = lessons.find(item => item.id === form.dataset.lesson);
      const answer = Number(values.get('answer'));
      state.activities[lesson.id] = answer; save();
      document.getElementById('activity-feedback').innerHTML = answerFeedback(answer, lesson.question);
    }
    if (form.id === 'quiz-form') {
      state.quiz[quizIndex] = Number(values.get('answer')); save();
      document.getElementById('quiz-feedback').innerHTML = answerFeedback(state.quiz[quizIndex], quiz[quizIndex]);
      main.querySelector('[data-action="next-question"]').disabled = false;
      main.querySelector('.quiz-top').lastElementChild.textContent = countAnswers() + ' respondida' + (countAnswers() !== 1 ? 's' : '');
      main.querySelector('.progress-fill').style.width = countAnswers() / quiz.length * 100 + '%';
    }
    if (form.id === 'typing-form') {
      const match = String(values.get('practice')).trim().replace(/\s+/g, ' ') === lessons[0].exercise.prompt;
      document.getElementById('typing-feedback').textContent = match ? 'Muito bem! Você digitou a frase corretamente.' : 'Quase lá. Compare as letras, os espaços e o ponto final. Apague o que precisar e tente novamente.';
    }
    if (form.id === 'email-practice') {
      document.getElementById('email-feedback').textContent = String(values.get('subject')).trim() && String(values.get('message')).trim() ? 'Você preencheu o assunto e a mensagem. Confira também o destinatário antes de um envio real. Esta foi apenas uma simulação: nada foi enviado.' : 'Preencha o assunto e a mensagem com um texto de exemplo.';
    }
    if (form.id === 'feedback-form') {
      const entry = {device: values.get('device'), navigation: Number(values.get('navigation')), clarity: Number(values.get('clarity')), support: values.get('support'), suggestion: String(values.get('suggestion') || '').trim().slice(0, 600)};
      const checked = Store.sanitize({feedback: [entry]}).feedback[0];
      if (!checked) {notify('Confira os campos obrigatórios da avaliação.'); return;}
      if (state.feedback.length >= 100) {notify('O limite de 100 registros locais foi atingido. Baixe as avaliações antes de apagar os dados e começar outra coleta.'); return;}
      state.feedback.push(checked); save(); feedbackMode = 'success'; renderFeedback(); main.focus();
    }
  });
  document.querySelector('.skip-link').addEventListener('click', event => {event.preventDefault(); main.focus();});
  document.getElementById('font-toggle').addEventListener('click', () => {
    state.preferences.font = (state.preferences.font + 1) % 3; applyPreferences(); save();
    notify('Tamanho do texto: ' + ['normal', 'ampliado', 'maior'][state.preferences.font] + '.');
  });
  document.getElementById('contrast-toggle').addEventListener('click', () => {
    state.preferences.contrast = !state.preferences.contrast; applyPreferences(); save();
    notify(state.preferences.contrast ? 'Alto contraste ativado.' : 'Contraste padrão ativado.');
  });
  document.getElementById('confirm-cancel').addEventListener('click', () => {pendingReset = null; document.getElementById('confirm-dialog').close();});
  document.getElementById('confirm-accept').addEventListener('click', () => {document.getElementById('confirm-dialog').close(); performReset();});
  document.getElementById('confirm-dialog').addEventListener('cancel', () => {pendingReset = null;});
  window.addEventListener('hashchange', () => route());
  window.addEventListener('storage', event => {
    if (event.key === 'aprender-digital-v1' || event.key === null) {
      state = Store.read(); applyPreferences(); notify('Os dados foram alterados em outra aba. Reabra esta página do menu para atualizar o conteúdo.');
    }
  });
  applyPreferences();
  document.getElementById('storage-warning').hidden = Store.available();
  route(false);
})();
