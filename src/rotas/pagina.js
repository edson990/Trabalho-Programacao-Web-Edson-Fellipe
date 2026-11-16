const express = require('express');
const { sessoes } = require('../middlewares/sessao');
const { buscaProduto } = require('../dados/produtos');
const { criarPedido } = require('../dados/pedidos');
const { resumoDoCarrinho } = require('../servicos/carrinho');
const { pagina } = require('../views/loja');

const rotas = express.Router();

rotas.get('/', (requisicao, resposta) => {
  resposta.send(pagina({ requisicao }));
});

rotas.post('/entrar', (requisicao, resposta) => {
  const nome = String(requisicao.body?.nome ?? '').trim();
  if (!nome) return resposta.status(400).send(pagina({ requisicao, aviso: 'Diga o seu nome para entrar' }));
  requisicao.sessao.nome = nome;
  resposta.redirect(303, '/');
});

rotas.post('/sair', (requisicao, resposta) => {
  sessoes.delete(requisicao.sid);
  resposta.clearCookie('sid');
  resposta.redirect(303, '/');
});

rotas.post('/carrinho/:id', (requisicao, resposta) => {
  const produto = buscaProduto(requisicao.params.id);
  if (!produto) return resposta.status(404).send(pagina({ requisicao, aviso: 'Produto não existe' }));
  const { carrinho } = requisicao.sessao;
  carrinho.set(produto.id, (carrinho.get(produto.id) || 0) + 1);
  resposta.redirect(303, '/');
});

rotas.post('/pedidos', (requisicao, resposta) => {
  const { sessao } = requisicao;
  if (!sessao.nome) {
    return resposta.status(401).send(pagina({ requisicao, aviso: 'Diga o seu nome antes de fechar o pedido' }));
  }
  if (sessao.carrinho.size === 0) {
    return resposta.status(400).send(pagina({ requisicao, aviso: 'O carrinho está vazio' }));
  }
  const { itens, total } = resumoDoCarrinho(sessao);
  criarPedido({ dono: sessao.nome, itens, total });
  sessao.carrinho.clear();
  resposta.redirect(303, '/');
});

module.exports = rotas;