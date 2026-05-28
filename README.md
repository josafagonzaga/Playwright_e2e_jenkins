# Playwright E2E Complysoft

Automacao E2E com Playwright e TypeScript para o site da Complysoft:

```text
https://complysolutions.com.br
```

## Tecnologias

- Playwright Test
- TypeScript
- Node.js
- ESLint
- Prettier
- GitHub Actions

## Estrutura

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── scripts/
│   └── run-impacted-tests.mjs
├── tests/
│   ├── data/
│   │   └── shared.data.ts
│   ├── fixtures/
│   │   └── pages.fixture.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   └── HomePage.ts
│   └── home.spec.ts
├── .env.example
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Instalacao

Instale as dependencias:

```bash
npm ci
```

Instale os browsers usados pelo Playwright:

```bash
npx playwright install
```

## Configuracao

Crie um arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

URL configurada por padrao:

```bash
BASE_URL=https://complysolutions.com.br
```

O `playwright.config.ts` le automaticamente o arquivo `.env` quando ele existir. Em CI, prefira configurar `BASE_URL` como variavel de ambiente da pipeline.

## Execucao Dos Testes

Rodar a suite completa em modo headless:

```bash
npm test
```

Rodar os testes da home:

```bash
npm run test:home
```

Rodar testes por tag:

```bash
npm run test:smoke
npm run test:content
npm run test:links
npm run test:navigation
npm run test:footer
npm run test:mobile
npm run test:search
```

Rodar testes impactados pelos arquivos alterados:

```bash
npm run test:changed
```

Rodar com navegador visivel:

```bash
npm run test:headed
```

Abrir o UI Mode:

```bash
npm run test:ui
```

Abrir o relatorio HTML:

```bash
npm run report
```

## Qualidade

Rodar verificacao de formatacao:

```bash
npm run format:check
```

Rodar ESLint:

```bash
npm run lint
```

Rodar checagem TypeScript:

```bash
npm run typecheck
```

Rodar todas as validacoes de qualidade:

```bash
npm run quality
```

Rodar fluxo local equivalente ao CI:

```bash
npm run ci
```

## Cenarios Iniciais

A suite inicial cobre a home da Complysoft:

- carregamento da pagina inicial e validacao do titulo;
- exibicao do hero principal;
- exibicao das secoes institucionais;
- exibicao das principais solucoes;
- exibicao de segmentos atendidos;
- exibicao de canais principais de contato.

## Evolucao Dos Testes

1. Mantenha Page Objects em `tests/pages/` quando houver reutilizacao real.
2. Mantenha dados reutilizaveis em `tests/data/`.
3. Exponha novos Page Objects em `tests/fixtures/pages.fixture.ts`.
4. Use tags nos titulos dos testes, como `@smoke`, `@home`, `@contact` ou uma tag de modulo.
5. Quando criar uma tag nova importante, adicione um script no `package.json`.
6. Se usar `npm run test:changed`, atualize `scripts/run-impacted-tests.mjs` com o mapeamento entre arquivos e tags do novo dominio.

## CI/CD

O workflow em `.github/workflows/playwright.yml` executa:

- `npm ci`;
- `npx playwright install --with-deps`;
- `npm run quality`;
- `npm run test:changed` em pull requests;
- `npm test` em pushes para `main`;
- upload do `playwright-report/` como artifact.

## CI/CD com Jenkins

A migracao para Jenkins esta documentada em `docs/ci-cd/jenkins-migration.md`.

O projeto possui um `Jenkinsfile` declarativo na raiz com checkout, instalacao de dependencias, instalacao dos browsers do Playwright, validacoes de qualidade, testes E2E e arquivamento de relatorios/evidencias.
