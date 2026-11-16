const produtos = [
  { id: 1, nome: 'Caderno universitário', preco: 2490 },
  { id: 2, nome: 'Caneta azul', preco: 250 },
  { id: 3, nome: 'Mochila', preco: 14900 },
  { id: 4, nome: 'Garrafa térmica', preco: 5990 },
  { id: 5, nome: 'Fone de ouvido', preco: 8900 },
];

function buscaProduto(id) {
  return produtos.find((p) => p.id === Number(id));
}

module.exports = { produtos, buscaProduto };