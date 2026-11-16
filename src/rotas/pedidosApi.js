const express = require('express');
const { pedidos, pedidosDe } = require('../dados/pedidos');

const rotas = express.Router();

rotas.get('/', (requisicao, resposta) => {
  const { nome } = requisicao.sessao;
  if (!nome) return resposta.status(401).json({ erro: 'Diga o seu nome.' });
  resposta.status(200).json(pedidosDe(nome));
});

rotas.delete('/:id', (requisicao, resposta) => {
  const { nome } = requisicao.sessao;
  if (!nome) return resposta.status(401).json({ erro: 'Diga o seu nome.' });
  const pedido = pedidos.get(Number(requisicao.params.id));
  if (!pedido) return resposta.status(404).json({ erro: 'Pedido não existe.' });
  if (pedido.dono !== nome) return resposta.status(403).json({ erro: 'Esse pedido é de outra pessoa.' });
  pedidos.delete(pedido.id);
  resposta.status(204).end();
});

module.exports = rotas;