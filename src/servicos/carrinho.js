const { buscaProduto } = require('../dados/produtos');

function resumoDoCarrinho(sessao) {
  const itens = [...sessao.carrinho].map(([id, quantidade]) => {
    const produto = buscaProduto(id);
    return { id, nome: produto.nome, preco: produto.preco, quantidade, subtotal: produto.preco * quantidade };
  });
  const total = itens.reduce((soma, item) => soma + item.subtotal, 0);
  return { itens, total };
}

module.exports = { resumoDoCarrinho };