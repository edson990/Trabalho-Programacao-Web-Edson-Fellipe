const pedidos = new Map();
let proximoNumero = 1;

function criarPedido({ dono, itens, total }) {
  const id = proximoNumero++;
  const pedido = { id, dono, itens, total };
  pedidos.set(id, pedido);
  return pedido;
}

function pedidosDe(nome) {
  return [...pedidos.values()].filter((p) => p.dono === nome);
}

module.exports = { pedidos, criarPedido, pedidosDe };