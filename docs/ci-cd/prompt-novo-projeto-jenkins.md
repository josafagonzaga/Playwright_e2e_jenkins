# Prompt para aplicar Jenkins em um novo projeto Playwright

Use este prompt em um novo projeto quando quiser aplicar o mesmo padrao de Jenkins/CI usado neste repositorio.

````text
Atue como especialista em QA Automation com Playwright, TypeScript e Jenkins.

Quero aplicar neste novo projeto o mesmo padrao de Jenkins/CI usado no projeto `Playwright_e2e_jenkins`.

Objetivo:
Configurar o projeto para rodar testes Playwright no Jenkins com qualidade, relatorio JUnit, relatorio HTML do Playwright e possibilidade futura de webhook GitHub.

Antes de alterar qualquer coisa:
1. Leia a estrutura do projeto.
2. Verifique `package.json`, `playwright.config.*`, pasta `tests`, fixtures, Page Objects, helpers e documentacao existente.
3. Preserve os padroes locais do projeto.
4. Nao reescreva tudo sem necessidade.
5. Faca mudancas pequenas, rastreaveis e justificaveis.

Implemente ou ajuste:

1. Scripts no `package.json`

Garanta scripts equivalentes a:

- `test`
- `quality`
- `ci`
- `report`

Se fizer sentido para o projeto, tambem adicione:

- `test:functional`
- `test:visual`
- `test:visual:update`
- scripts por tag, como `test:smoke`, `test:home`, `test:header`, etc.

2. Configuracao do Playwright

Garanta que em ambiente CI o Playwright gere:

- relatorio HTML em `playwright-report`
- relatorio JUnit em `test-results/junit.xml`

Use algo equivalente a:

```ts
reporter: process.env.CI
  ? [
      ['list'],
      ['html', { outputFolder: 'playwright-report', open: 'never' }],
      ['junit', { outputFile: 'test-results/junit.xml' }],
    ]
  : 'html'
```

3. Jenkinsfile

Crie ou ajuste um `Jenkinsfile` declarativo com stages para:

- checkout
- preparar ambiente
- instalar dependencias com `npm ci`
- instalar browsers Playwright com `npx playwright install --with-deps`
- rodar qualidade com `npm run quality`
- rodar testes com `npm test`
- publicar JUnit
- publicar HTML Report usando HTML Publisher
- arquivar `playwright-report/**` e `test-results/**`

O Jenkinsfile deve usar `CI=true` e permitir `BASE_URL` como parametro, se o projeto usar URL base.

4. Docker/Jenkins

Se o projeto ainda nao tiver documentacao de Jenkins local, crie documentacao explicando como usar um Jenkins em Docker com Node.js 22 e HTML Publisher.

Nao coloque credenciais no repositorio.

5. Webhook GitHub

Documente como configurar o webhook do GitHub apontando para:

```text
https://SEU_JENKINS_OU_NGROK/github-webhook/
```

6. Validacao

Depois de implementar, rode:

```bash
npm run quality
npm test
npm run ci
```

Se houver testes visuais:

```bash
npm run test:visual
```

7. Resultado esperado

Ao final, me entregue:

- arquivos alterados;
- scripts criados/ajustados;
- comandos executados;
- resultado dos testes;
- proximos passos para criar o job no Jenkins;
- pontos de atencao encontrados.

Nao faca commit nem push sem eu autorizar.
````

## Checklist rapido para o novo projeto

- O novo projeto deve ter `npm ci` funcionando.
- O comando `npm run quality` deve validar formatacao, lint e TypeScript, quando essas ferramentas existirem no projeto.
- O comando `npm test` deve rodar a suite que sera executada no Jenkins.
- O Playwright deve gerar `playwright-report/index.html`.
- O Playwright deve gerar `test-results/junit.xml` em CI.
- O `Jenkinsfile` deve publicar JUnit, HTML Report e artefatos.
- O webhook do GitHub deve apontar para `/github-webhook/`.
