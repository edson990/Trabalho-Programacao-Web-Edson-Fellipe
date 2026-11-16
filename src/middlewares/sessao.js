const { randomUUID } = require('node:crypto');

const sessoes = new Map();

function middlewareSessao(requisicao, resposta, proximo) {
  const cookie = (requisicao.headers.cookie || '').split('; ').find((c) => c.startsWith('sid='));
  let id = cookie && cookie.slice(4);
  if (!sessoes.has(id)) {
    id = randomUUID();
    sessoes.set(id, { nome: null, carrinho: new Map() });
    resposta.cookie('sid', id, { httpOnly: true, sameSite: 'lax', maxAge: 2 * 60 * 60 * 1000 });
  }
  requisicao.sid = id;
  requisicao.sessao = sessoes.get(id);
  proximo();
}

module.exports = { sessoes, middlewareSessao };