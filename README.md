# Loja da Turma — Atividade 02

Loja virtual com carrinho e pedidos usando sessão por cookie (Express 5).

## Rodar com Docker

```
docker compose up --build
```

Abra http://localhost:3000. Para parar: `docker compose down`.

## Rodar sem Docker

Precisa do Node 20 ou mais novo.

```
npm install
npm start
```

## Porta

Por padrão é a 3000. Para mudar, copie `.env.example` para `.env` e edite o `PORT`.
A `bancada.js` usa a porta 3000 fixa.

## Testar pela bancada

```
node bancada.js @ana POST /entrar nome=Ana
node bancada.js @ana PUT /api/carrinho/1 quantidade=3
node bancada.js @ana GET /api/carrinho
```

## Estrutura

```
servidor.js          liga tudo
src/dados            catálogo e pedidos (em memória)
src/servicos         regras do carrinho
src/middlewares      sessão por cookie
src/rotas            página, API do carrinho, API de pedidos
src/views            HTML da loja
publico/             estilo.css
```