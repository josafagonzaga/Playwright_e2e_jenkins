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
- Jenkins

## Estrutura

```text
.
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   └── ci-cd/
│       └── jenkins-migration.md
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
├── Jenkinsfile
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

## CI/CD com Jenkins

O `Jenkinsfile` declarativo na raiz executa:

- `npm ci`;
- `npx playwright install --with-deps`;
- `npm run quality`;
- `npm run test:changed` em pull requests detectados pelo Jenkins;
- `npm test` em builds de branch ou execucoes manuais comuns;
- publicacao do resultado estruturado em `test-results/junit.xml`;
- publicacao do relatorio visual `playwright-report/index.html` com HTML Publisher;
- arquivamento de `playwright-report/**` e `test-results/**`.

Configure `BASE_URL` como parametro do job quando precisar alterar o ambiente alvo. O `Jenkinsfile` define `CI=true` para manter o comportamento de CI do Playwright.

### HTML Publisher no Jenkins

Instale o plugin `HTML Publisher` no Jenkins antes de executar a pipeline. Com o plugin instalado, o `Jenkinsfile` publica o relatorio do Playwright a partir de:

```text
playwright-report/index.html
```

Apos a build, abra o link **Playwright HTML Report** na pagina do build ou do job para navegar no relatorio visual.

### Como analisar falhas no Jenkins

1. Abra o build que falhou.
2. Acesse **Test Result** para ver a lista estruturada dos testes que falharam.
3. Clique no teste falho para ver a mensagem, arquivo e linha do erro.
4. Se precisar de mais contexto, abra os artefatos em `test-results/`.
5. Para navegar no relatorio visual do Playwright, abra **Playwright HTML Report** no Jenkins.
6. Use **Console Output** principalmente para falhas de infraestrutura, como instalacao de dependencias, browsers ou variaveis de ambiente.

A migracao para Jenkins esta documentada em `docs/ci-cd/jenkins-migration.md`.

O workflow antigo em `.github/workflows/playwright.yml` foi mantido apenas para execucao manual via `workflow_dispatch`, evitando execucoes duplicadas em push e pull request depois da migracao para Jenkins.
