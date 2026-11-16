const { produtos } = require('../dados/produtos');
const { pedidosDe } = require('../dados/pedidos');
const { resumoDoCarrinho } = require('../servicos/carrinho');

function reais(centavos) {
  return 'R$ ' + (centavos / 100).toFixed(2).replace('.', ',');
}

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pagina({ requisicao, aviso }) {
  const { nome } = requisicao.sessao;
  const { itens, total } = resumoDoCarrinho(requisicao.sessao);

  const vitrine = produtos.map((p) => `
        <li>
          <span>${escapar(p.nome)}</span>
          <strong>${reais(p.preco)}</strong>
          <form method="POST" action="/carrinho/${p.id}"><button>Adicionar</button></form>
        </li>`).join('');

  const listaCarrinho = itens.length
    ? `<ul>${itens.map((i) => `
        <li><span>${i.quantidade}x ${escapar(i.nome)}</span><strong>${reais(i.subtotal)}</strong></li>`).join('')}
      </ul>
      <p class="total">Total: ${reais(total)}</p>`
    : '<p class="vazio">O carrinho está vazio.</p>';

  const meusPedidos = nome ? pedidosDe(nome) : [];
  const listaPedidos = nome
    ? '<h2>Meus pedidos</h2>' + (meusPedidos.length
      ? `<ul>${meusPedidos.map((p) => `
        <li><span>Pedido ${p.id}: ${p.itens.map((i) => `${i.quantidade}x ${escapar(i.nome)}`).join(', ')}</span><strong>${reais(p.total)}</strong></li>`).join('')}
      </ul>`
      : '<p class="vazio">Nenhum pedido ainda.</p>')
    : '';

  const identificacao = nome
    ? `<div class="saudacao"><p>Olá, ${escapar(nome)}!</p><form method="POST" action="/sair"><button>Sair</button></form></div>`
    : `<form method="POST" action="/entrar" class="saudacao"><input name="nome" placeholder="Seu nome"><button>Entrar</button></form>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Loja da Turma</title>
  <link rel="stylesheet" href="/estilo.css">
</head>
<body>
  <header>
    <h1>Loja da Turma</h1>
    <p>Programação WEB I — Atividade 02</p>
  </header>
  ${identificacao}
  ${aviso ? `<p class="erro">${escapar(aviso)}</p>` : ''}
  <main>
    <section>
      <h2>Produtos</h2>
      <ul class="vitrine">${vitrine}
      </ul>
    </section>
    <aside>
      <h2>Carrinho</h2>
      ${listaCarrinho}
      <form method="POST" action="/pedidos"><button>Fechar pedido</button></form>
      ${listaPedidos}
    </aside>
  </main>
</body>
</html>`;
}

module.exports = { pagina };