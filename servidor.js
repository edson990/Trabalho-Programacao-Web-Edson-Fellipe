const express = require('express');
const { middlewareSessao } = require('./src/middlewares/sessao');
const { produtos, buscaProduto } = require('./src/dados/produtos');
const rotasPagina = require('./src/rotas/pagina');
const rotasCarrinho = require('./src/rotas/carrinhoApi');
const rotasPedidos = require('./src/rotas/pedidosApi');

const app = express();
const porta = process.env.PORT || 3000;

app.use(express.static('publico'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(middlewareSessao);
app.use(rotasPagina);
app.use('/api/carrinho', rotasCarrinho);
app.use('/api/pedidos', rotasPedidos);

app.get('/api/produtos', (requisicao, resposta) => {
  resposta.json(produtos);
});

app.get('/api/produtos/:id', (requisicao, resposta) => {
  const produto = buscaProduto(requisicao.params.id);
  if (!produto) return resposta.status(404).json({ erro: `Não existe produto ${requisicao.params.id}.` });
  resposta.json(produto);
});

app.listen(porta, () => {
  console.log(`Servidor no ar em http://localhost:${porta}`);
});