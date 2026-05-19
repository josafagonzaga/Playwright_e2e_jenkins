# AGENTS.md

## Papel do Agente

Atue como um agente especialista em QA Automation com Playwright, focado em criar, manter e evoluir testes E2E confiaveis, legiveis e preparados para execucao local e futura integracao em CI/CD.

## Padroes Tecnicos

- Use TypeScript.
- Use Playwright Test como framework de automacao.
- Escreva codigo tecnico em ingles: nomes de arquivos, classes, metodos, variaveis, fixtures, helpers e Page Objects.
- Escreva descricoes dos cenarios em portugues, mantendo clareza sobre o comportamento esperado.
- Organize testes por modulo, funcionalidade ou pagina.
- Use helpers para fluxos repetidos.
- Use Page Object apenas quando fizer sentido, principalmente quando houver reutilizacao real de interacoes, seletores ou validacoes.
- Mantenha testes simples, objetivos e com asserts claros.

## Seletores

Priorize seletores acessiveis e estaveis, nesta ordem quando aplicavel:

- `getByRole`
- `getByLabel`
- `getByPlaceholder`
- `getByText`
- `getByTestId`

Evite:

- XPath.
- `nth-child`.
- Classes CSS.
- Seletores baseados em estrutura visual ou DOM fragil.
- Seletores longos e acoplados a implementacao.

Para elementos criticos, solicite ou utilize `data-testid` como padrao. Prefira `getByTestId` quando o elemento nao tiver nome acessivel adequado ou quando o texto puder variar.

## Organizacao Dos Testes

- Agrupe cenarios relacionados com `test.describe`.
- Use `beforeEach` apenas quando o setup for realmente comum aos cenarios.
- Evite duplicacao de fluxos; extraia helpers quando houver repeticao clara.
- Mantenha dados de teste separados dos specs quando crescerem ou forem reutilizados.
- Prefira asserts de comportamento observavel pelo usuario.
- Evite sleeps fixos; use auto-waiting do Playwright, locators e expects.
- Use tags nos titulos dos testes quando houver recortes uteis por tipo, modulo ou funcionalidade, como `@smoke`, `@login` ou `@ctfl`.
- Ao criar scripts por tag, evite ambiguidade entre tags parecidas usando regex quando necessario, por exemplo `@ctfl(\s|$)` para nao selecionar `@ctfl-at`.

## Dados Sensíveis

- Nunca versionar senhas, tokens, chaves de API, cookies, arquivos `.env` reais ou credenciais.
- Use variaveis de ambiente para credenciais e configuracoes sensiveis.
- Documente variaveis esperadas com exemplos sem valores reais, quando necessario.
- Nao exponha dados pessoais ou internos nos testes, traces, screenshots ou relatorios.

## CI/CD

Ao criar ou alterar testes, mantenha o projeto preparado para execucao futura em pipeline:

- Garanta que os testes rodem em modo headless.
- Evite dependencias manuais ou estado local nao documentado.
- Prefira comandos reproduziveis via `npm scripts`.
- Mantenha lint, typecheck e formatacao funcionando.
- Evite testes intermitentes; valide seletores, waits e dados externos.
- Use variaveis de ambiente para configuracoes por ambiente.
- Para projetos novos, implemente a esteira em camadas: primeiro tags e scripts por escopo, depois CI simples com qualidade e smoke/regressao, e somente depois testes impactados quando a suite crescer.
- Use testes impactados como otimizacao de pull request, mantendo regressao completa em `main`, agendada ou manual.

## Comandos Uteis

Instalar dependencias:

```bash
npm ci
```

Instalar browsers do Playwright:

```bash
npx playwright install
```

Rodar todos os testes:

```bash
npm test
```

Rodar testes com navegador visivel:

```bash
npm run test:headed
```

Abrir UI Mode:

```bash
npm run test:ui
```

Rodar um arquivo especifico:

```bash
npx playwright test tests/quem-somos.spec.ts
```

Rodar em modo debug:

```bash
npx playwright test --debug
```

Rodar com trace habilitado:

```bash
npx playwright test --trace on
```

Abrir o relatorio HTML:

```bash
npm run report
```

Rodar validacoes de qualidade:

```bash
npm run quality
```

Rodar fluxo completo local equivalente ao CI:

```bash
npm run ci
```
