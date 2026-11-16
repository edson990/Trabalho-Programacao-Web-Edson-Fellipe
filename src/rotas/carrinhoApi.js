const express = require('express');
const { buscaProduto } = require('../dados/produtos');
const { resumoDoCarrinho } = require('../servicos/carrinho');

const rotas = express.Router();

rotas.get('/', (requisicao, resposta) => {
  resposta.status(200).json(resumoDoCarrinho(requisicao.sessao));
});

rotas.put('/:id', (requisicao, resposta) => {
  const produto = buscaProduto(requisicao.params.id);
  if (!produto) return resposta.status(404).json({ erro: 'Produto não existe.' });
  const quantidade = requisicao.body?.quantidade;
  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return resposta.status(400).json({ erro: 'A quantidade deve ser um inteiro de 1 para cima.' });
  }
  requisicao.sessao.carrinho.set(produto.id, quantidade);
  resposta.status(200).json(resumoDoCarrinho(requisicao.sessao));
});

rotas.delete('/:id', (requisicao, resposta) => {
  const id = Number(requisicao.params.id);
  if (!requisicao.sessao.carrinho.delete(id)) {
    return resposta.status(404).json({ erro: 'Produto não está no carrinho.' });
  }
  resposta.status(204).end();
});

module.exports = rotas;