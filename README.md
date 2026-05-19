# Playwright Test Automation Practice

Projeto de automação de testes E2E com Playwright e TypeScript para validar páginas do site
[Cantinho das QAs](https://www.cantinhodasqas.com.br/).

O objetivo é demonstrar uma base de testes organizada para portfólio, com cenários funcionais, Page Objects, dados de
teste separados, fixtures, validações de qualidade e execução em pipeline CI/CD.

## Tecnologias

- Playwright
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
├── tests/
│   ├── data/
│   │   ├── ctfl-at.data.ts
│   │   ├── ctfl.data.ts
│   │   ├── parcerias.data.ts
│   │   ├── quem-somos.data.ts
│   │   ├── shared.data.ts
│   │   ├── sites-para-praticar.data.ts
│   │   └── trilha-de-estudos.data.ts
│   ├── fixtures/
│   │   └── pages.fixture.ts
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── CtflAtPage.ts
│   │   ├── CtflPage.ts
│   │   ├── ParceriasPage.ts
│   │   ├── QuemSomosPage.ts
│   │   ├── SitesParaPraticarPage.ts
│   │   └── TrilhaDeEstudosPage.ts
│   ├── ctfl-at.spec.ts
│   ├── ctfl.spec.ts
│   ├── parcerias.spec.ts
│   ├── quem-somos.spec.ts
│   ├── sites-para-praticar.spec.ts
│   └── trilha-de-estudos.spec.ts
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Cenários Cobertos

A suíte possui 22 testes automatizados cobrindo:

- Página `Quem Somos`
  - navegação principal;
  - headings de missão, visão e valores;
  - conteúdo e links do rodapé;
  - links internos da navegação;
  - menu `More`;
  - links de perfis das administradoras.
- Página `Trilha de Estudos`
  - conteúdos principais da trilha;
  - links de recursos de estudo;
  - links do rodapé.
- Página `Parcerias`
  - conteúdos de parcerias;
  - links externos das parcerias;
  - links do rodapé.
- Página `Sites para Praticar`
  - categorias de sites para prática;
  - links dos sites recomendados;
  - links do rodapé.
- Página `CTFL`
  - conteúdos de estudo para CTFL;
  - links de simulados, vídeos e materiais;
  - links do rodapé.
- Página `CTFL-AT`
  - conteúdos de estudo para CTFL-AT;
  - links dos formulários de estudo;
  - links do rodapé.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/josafagonzaga/Playwright_testautomationpractice.git
cd Playwright_testautomationpractice
npm ci
```

Instale os browsers usados pelo Playwright:

```bash
npx playwright install
```

## Execução Dos Testes

Rodar a suíte completa em modo headless:

```bash
npm test
```

Rodar testes impactados pelos arquivos alterados:

```bash
npm run test:changed
```

Rodar testes por tipo de cenário:

```bash
npm run test:smoke
npm run test:content
npm run test:links
npm run test:navigation
npm run test:footer
npm run test:mobile
npm run test:search
```

Rodar testes por domínio:

```bash
npm run test:quem-somos
npm run test:trilha-de-estudos
npm run test:parcerias
npm run test:sites-para-praticar
npm run test:ctfl
npm run test:ctfl-at
```

Rodar os testes com navegador visível:

```bash
npm run test:headed
```

Abrir o modo interativo do Playwright:

```bash
npm run test:ui
```

Listar os testes encontrados pelo Playwright:

```bash
npx playwright test --list
```

## Relatório

Após a execução dos testes, abra o relatório HTML:

```bash
npm run report
```

O relatório é gerado na pasta `playwright-report/`, que não deve ser versionada.

## Qualidade

Rodar verificação de formatação:

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

Rodar todas as validações de qualidade:

```bash
npm run quality
```

Rodar validações de qualidade e testes impactados:

```bash
npm run ci:changed
```

Formatar os arquivos automaticamente:

```bash
npm run format
```

## CI/CD

O projeto possui workflow em `.github/workflows/playwright.yml`.

O pipeline roda automaticamente em:

- `push` para a branch `main`;
- `pull_request` para a branch `main`.

Etapas executadas no GitHub Actions:

- checkout do repositório;
- setup do Node.js 22;
- instalação das dependências com `npm ci`;
- instalação dos browsers do Playwright com `npx playwright install --with-deps`;
- execução de `npm run quality`;
- execução de `npm run test:changed` em pull requests;
- execução de `npm test` em pushes para `main`;
- upload do `playwright-report/` como artifact.

## Próximos Passos

- Aumentar cobertura com cenários de busca, responsividade e navegação em mais páginas.
- Avaliar execução em múltiplos navegadores.
- Adicionar tags por tipo de teste ou página.
- Melhorar o README com badge do GitHub Actions após o primeiro pipeline publicado.
