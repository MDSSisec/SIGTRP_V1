## SGI Essentials

Sistema interno da SISEC para centralizar funcionalidades operacionais, como visão geral, reserva da sala de reunião, férias e relatório semanal.

Este projeto usa Next.js com App Router, React, TypeScript e deploy na Vercel.

## O Que Foi Ajustado

Para viabilizar o deploy no plano Hobby da Vercel, refatoramos as rotas de API. O plano Hobby permite no máximo 12 Serverless Functions por deploy, e o projeto tinha várias rotas em `app/api`, fazendo a Vercel contar cada endpoint como uma function separada.

Agora as APIs foram consolidadas em uma única rota catch-all:

```txt
app/api/[[...path]]/route.ts
```

As URLs públicas continuam iguais para o frontend. A mudança foi interna, na forma como o Next/Vercel organiza as functions.

Exemplos de URLs que continuam funcionando:

```txt
/api/auth/login
/api/auth/logout
/api/auth/me
/api/auth/users/dait
/api/auth/users/solicitantes
/api/health
/api/reserva-sala-reuniao
/api/reserva-sala-reuniao/:id
/api/reserva-sala-reuniao/:id/autorizar
/api/reserva-sala-reuniao/:id/cancelar
/api/ferias
/api/ferias/:id
/api/relatorio-semanal
/api/relatorio-semanal/:id
/api/relatorio-semanal/:id/fechar
/api/relatorio-semanal/:id/reabrir
/api/relatorio-semanal/:id/preencher/:userEmail
```

## Como Funciona Agora

Todas as chamadas para `/api/*` chegam em `app/api/[[...path]]/route.ts`.

Esse arquivo:

- Lê o caminho recebido em `params.path`.
- Identifica o domínio da API, como `auth`, `ferias`, `reserva-sala-reuniao`, `relatorio-semanal` ou `health`.
- Encaminha a requisição para a função interna correta de acordo com método HTTP e caminho.
- Mantém as mesmas validações, permissões e respostas JSON que existiam antes.

Exemplo:

```txt
POST /api/auth/login
```

entra na catch-all como:

```txt
path = ["auth", "login"]
method = "POST"
```

e é encaminhada para o fluxo interno de login.

Outro exemplo:

```txt
POST /api/reserva-sala-reuniao/abc123/cancelar
```

entra como:

```txt
path = ["reserva-sala-reuniao", "abc123", "cancelar"]
method = "POST"
```

e chama a regra de cancelamento da reserva.

## Rotas Do Sistema

Rotas principais de tela:

```txt
/inicio
/sala-de-reuniao
/ferias
/dashboard/relatorio-semanal
```

Observação: algumas rotas antigas com `/dashboard` podem continuar existindo como compatibilidade ou redirecionamento, mas a navegação principal já usa as rotas novas quando aplicável.

## Organização Do Código

As regras de negócio ficam fora da rota catch-all, na pasta `server/`.

Importante: não usamos mais uma pasta raiz chamada `api/`, porque a Vercel interpreta essa pasta como Serverless Functions próprias e isso estoura o limite do plano Hobby.

```txt
server/auth
server/ferias
server/reserva-sala-reuniao
server/relatorio-semanal
server/health
```

As features de frontend continuam organizadas em:

```txt
features/login
features/home
features/ferias
features/reserva_sala_de_reuniao
features/relatorio_semanal
```

A rota `app/api/[[...path]]/route.ts` deve ser vista como um roteador HTTP, não como o lugar principal para regras de negócio.

## Desenvolvimento Local

Instale as dependências:

```bash
npm install
```

Rode o servidor local:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Variáveis De Ambiente

Em produção, a variável `SESSION_SECRET` é obrigatória para login e sessão.

Na Vercel:

1. Acesse o projeto.
2. Vá em `Settings` > `Environment Variables`.
3. Crie `SESSION_SECRET`.
4. Gere um valor seguro com:

```bash
openssl rand -base64 32
```

5. Faça um novo deploy.

Para desenvolvimento local, copie `.env.example` para `.env.local` se ainda não tiver feito.

## Validação Antes Do Deploy

Antes de enviar para produção, rode:

```bash
npm run build
```

Também é útil validar TypeScript:

```bash
npx tsc --noEmit
```

E lint:

```bash
npm run lint
```

Observação: se o `tsc` reclamar de arquivos antigos dentro de `.next/dev/types`, rode `npm run build` para regenerar os tipos do Next. Se necessário, remova o cache local `.next` e gere novamente.

## Deploy Na Vercel

Depois de commit e push, o deploy pode ser feito pela integração com GitHub ou manualmente:

```bash
vercel --prod
```

O build esperado deve mostrar poucas rotas dinâmicas. O ponto importante para o plano Hobby é que as APIs estejam consolidadas, reduzindo a quantidade de Serverless Functions.

## Cuidados Ao Criar Novas APIs

Para continuar dentro do limite do Hobby, evite criar novos arquivos como:

```txt
app/api/minha-rota/route.ts
app/api/minha-rota/[id]/route.ts
```

Em vez disso, adicione o novo caminho dentro de:

```txt
app/api/[[...path]]/route.ts
```

Assim o projeto continua usando uma única Serverless Function para a maior parte das APIs.
