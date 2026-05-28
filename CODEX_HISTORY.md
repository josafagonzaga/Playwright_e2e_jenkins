# Historico Do Template Playwright

Este arquivo registra o contexto da criacao da base reutilizavel para que o Codex possa consultar rapidamente em sessoes futuras.

## Origem

O projeto original era:

```text
/home/josafa/Documentos/#git/Playwright_testautomationpractice_v2
```

Foi criada uma copia clonada para servir como template/base:

```text
/home/josafa/Documentos/#git/Playwright_e2e_template
```

O projeto original foi preservado sem alteracoes.

## Objetivo Da Base

Manter uma estrutura Playwright com TypeScript pronta para iniciar testes E2E em novas aplicacoes web.

A base deve permitir trocar a URL da aplicacao, criar novos Page Objects, adicionar dados de teste e escrever novos specs sem carregar dependencias do site antigo.

## O Que Foi Feito

- O projeto foi clonado para `Playwright_e2e_template`.
- O remoto `origin` antigo foi removido.
- Testes especificos do site antigo foram removidos.
- Page Objects especificos do site antigo foram removidos.
- Dados de teste especificos do site antigo foram removidos.
- `package.json` foi renomeado para `playwright-e2e-template`.
- `playwright.config.ts` passou a usar `BASE_URL`.
- Foi criado `.env.example` com valor ficticio.
- Foi criado um teste generico em `tests/example.spec.ts`.
- Foi criado um Page Object generico em `tests/pages/HomePage.ts`.
- `tests/pages/BasePage.ts` foi simplificado para comportamentos reutilizaveis.
- `tests/fixtures/pages.fixture.ts` foi ajustado para expor `homePage`.
- `tests/data/shared.data.ts` foi reduzido a dados genericos.
- `scripts/run-impacted-tests.mjs` foi limpo para remover tags antigas.
- `README.md` foi reescrito para explicar como usar a base.

## Arquivos Principais

```text
README.md
package.json
playwright.config.ts
.env.example
tests/example.spec.ts
tests/pages/BasePage.ts
tests/pages/HomePage.ts
tests/fixtures/pages.fixture.ts
tests/data/shared.data.ts
scripts/run-impacted-tests.mjs
```

## Validacoes Executadas

Foram executados:

```bash
npm run quality
npm run test:example
```

Resultado:

```text
quality passou
test:example passou com 1 teste
```

## Como Usar Em Um Novo Projeto

1. Abrir a pasta do template:

```bash
code -n /home/josafa/Documentos/#git/Playwright_e2e_template
```

2. Criar o `.env`:

```bash
cp .env.example .env
```

3. Alterar `BASE_URL` para a URL da aplicacao que sera testada.

4. Rodar o teste inicial:

```bash
npm run test:example
```

5. Substituir o teste de exemplo pelos cenarios reais da nova aplicacao.

6. Criar Page Objects em `tests/pages/` somente quando houver reutilizacao real.

7. Criar dados reutilizaveis em `tests/data/`.

8. Atualizar `tests/fixtures/pages.fixture.ts` quando novos Page Objects precisarem ser injetados nos testes.

9. Atualizar scripts por tag no `package.json` conforme os modulos do novo projeto.

10. Atualizar `scripts/run-impacted-tests.mjs` quando houver mapeamento real entre arquivos e tags.

## Observacoes Para Futuras Sessoes Do Codex

- Preservar o projeto original `Playwright_testautomationpractice_v2`.
- Trabalhar no template quando o objetivo for evoluir a base reutilizavel.
- Nao reintroduzir dados, URLs, Page Objects ou tags do site antigo.
- Manter codigo tecnico em ingles.
- Manter descricoes dos testes em portugues quando fizer sentido.
- Priorizar seletores acessiveis: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByText`, `getByTestId`.
- Evitar sleeps fixos.
- Rodar `npm run quality` e pelo menos um teste relevante apos mudancas.

## Atualizacao Para Complysoft

Em 2026-05-28, a base foi ajustada para iniciar a automacao do site:

```text
https://complysolutions.com.br
```

Mudancas principais:

- `BASE_URL` padrao passou a apontar para a Complysoft.
- O projeto foi renomeado para `playwright-e2e-complysoft`.
- O teste generico `tests/example.spec.ts` foi substituido por `tests/home.spec.ts`.
- `HomePage.ts` passou a validar hero, secoes principais, solucoes, segmentos e canais de contato.
- `shared.data.ts` passou a armazenar os dados iniciais da home da Complysoft.
- `test:example` foi substituido por `test:home`.
- `run-impacted-tests.mjs` passou a mapear alteracoes da home para a tag `@home`.
