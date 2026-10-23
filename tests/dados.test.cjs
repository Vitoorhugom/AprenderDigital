const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const project = path.resolve(__dirname, '..');
const root = fs.existsSync(path.join(project, 'dist', 'index.html')) ? path.join(project, 'dist') : project;
const dataSource = fs.readFileSync(path.join(root, 'assets/js/dados.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'assets/js/conteudos.js'), 'utf8');
function createContext(options = {}) {
  const values = new Map();
  const context = vm.createContext({localStorage: {
    getItem: key => {if (options.blocked) throw new Error('blocked'); return values.get(key) || null;},
    setItem: (key, value) => {if (options.blocked) throw new Error('blocked'); values.set(key, value);},
    removeItem: key => {if (options.blocked) throw new Error('blocked'); values.delete(key);}
  }});
  context.window = context;
  vm.runInContext(dataSource, context);
  vm.runInContext(contentSource, context);
  return {store: context.ADStore, content: context.ADContent, values};
}
test('conteúdos têm seis aulas, perguntas válidas e IDs únicos', () => {
  const {content} = createContext();
  assert.equal(content.lessons.length, 6);
  assert.equal(new Set(content.lessons.map(item => item.id)).size, 6);
  assert.equal(content.quiz.length, 6);
  for (const q of [...content.quiz, ...content.lessons.map(item => item.question)]) {
    assert.equal(q.options.length, 3);
    assert.ok(q.correct >= 0 && q.correct < q.options.length);
    assert.ok(q.explanation.length > 30);
  }
});
test('progresso e avaliações persistem e podem ser apagados', () => {
  const {store} = createContext();
  const state = store.empty();
  state.completed.push('internet');
  state.activities.internet = 2;
  state.feedback.push({device:'celular', navigation:5, clarity:4, support:'pouca-ajuda', suggestion:'Texto maior.'});
  assert.equal(store.write(state), true);
  assert.equal(store.read().completed[0], 'internet');
  assert.equal(store.read().feedback[0].suggestion, 'Texto maior.');
  assert.equal(store.read().activities.internet, 2);
  assert.equal(store.clear(), true);
  assert.equal(store.read().completed.length, 0);
  assert.equal(store.read().feedback.length, 0);
});
test('registros corrompidos ou adulterados não são usados como dados válidos', () => {
  const {store, values} = createContext();
  values.set('aprender-digital-v1', '{invalid');
  assert.equal(store.read().completed.length, 0);
  const clean = store.sanitize({completed:['internet','internet','<script>'], activities:{internet:9}, quiz:[9,'1',null], feedback:[{}, {device:'invalido'}], preferences:{font:99, contrast:'true'}});
  assert.equal(clean.completed.length, 1);
  assert.equal(clean.activities.internet, undefined);
  assert.equal(clean.quiz.every(answer => answer === null), true);
  assert.equal(clean.feedback.length, 0);
  assert.equal(clean.preferences.font, 0);
  assert.equal(clean.preferences.contrast, false);
});
test('armazenamento bloqueado não interrompe a leitura ou a escrita em memória', () => {
  const {store} = createContext({blocked:true});
  const state = store.read();
  assert.equal(state.completed.length, 0);
  assert.equal(store.available(), false);
  state.completed.push('arquivos');
  assert.equal(store.write(state), false);
  assert.equal(state.completed[0], 'arquivos');
});
test('pontuação conta acertos reais e não conta respostas ausentes', () => {
  const {store, content} = createContext();
  const correct = content.quiz.map(item => item.correct);
  assert.equal(store.score(correct, content.quiz), 6);
  assert.equal(store.score(Array(6).fill(null), content.quiz), 0);
  correct[0] = (correct[0] + 1) % 3;
  assert.equal(store.score(correct, content.quiz), 5);
});
test('texto de usuário é escapado e CSV neutraliza fórmulas', () => {
  const {store} = createContext();
  assert.equal(store.escapeHTML('<img onerror="alert(1)">'), '&lt;img onerror=&quot;alert(1)&quot;&gt;');
  const csv = store.feedbackCSV([{device:'computador',navigation:5,clarity:4,support:'sozinho',suggestion:'=HYPERLINK("https://example.com")'}]);
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('"\'=HYPERLINK(""https://example.com"")"'));
  assert.ok(csv.includes('"computador";"5";"4"'));
});
test('avaliações limitam o texto e não acrescentam identificação pessoal', () => {
  const {store} = createContext();
  const value = store.sanitize({feedback:[{device:'celular',navigation:3,clarity:4,support:'sozinho',suggestion:'x'.repeat(1000),name:'não deve persistir'}]});
  assert.equal(value.feedback[0].suggestion.length, 600);
  assert.equal(value.feedback[0].name, undefined);
});
