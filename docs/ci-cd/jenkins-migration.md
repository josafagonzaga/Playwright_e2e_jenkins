# Migracao de CI/CD para Jenkins

Este documento descreve a migracao da esteira atual de GitHub Actions para Jenkins, preservando o comportamento da pipeline existente para o projeto Playwright/TypeScript.

## Arquivos analisados

- `.github/workflows/playwright.yml`
- `package.json`
- `package-lock.json`
- `playwright.config.ts`
- `.env.example`
- `README.md`
- `scripts/run-impacted-tests.mjs`
- `eslint.config.mjs`
- `tsconfig.json`

Nao foram encontrados `Dockerfile`, `docker-compose.yml` ou `docker-compose.yaml`.

## O que o GitHub Actions fazia antes da migracao

Workflow analisado:

- `.github/workflows/playwright.yml`

Eventos originais:

- `push` para a branch `main`
- `pull_request` para a branch `main`

Apos a migracao, esse workflow foi mantido apenas para execucao manual via `workflow_dispatch`, evitando execucoes duplicadas em push e pull request enquanto o Jenkins assume a esteira principal.

Job:

- `test`, exibido como `Quality and E2E tests`
- Executor: `ubuntu-latest`

Etapas:

- Checkout do repositorio com `actions/checkout@v4` e `fetch-depth: 0`
- Setup do Node.js 22 com cache npm
- Instalacao de dependencias com `npm ci`
- Instalacao dos browsers e dependencias do Playwright com `npx playwright install --with-deps`
- Validacoes de qualidade com `npm run quality`
- Em pull requests: execucao de testes impactados com `npm run test:changed`
- Fora de pull requests: execucao funcional com `npm test`
- Upload do relatorio `playwright-report/` como artifact por 30 dias

Variaveis e secrets:

- O workflow atual nao referencia `secrets`.
- O projeto usa `BASE_URL`, com valor de exemplo em `.env.example`.
- O `playwright.config.ts` tambem possui fallback para `https://complysolutions.com.br`.
- O script `scripts/run-impacted-tests.mjs` usa `GITHUB_BASE_REF` quando disponivel para calcular diferencas em pull requests.

Artefatos:

- `playwright-report/`
- `test-results/` pode ser gerado pelo Playwright em falhas, traces, screenshots ou videos, conforme configuracao e resultado da execucao.

## Equivalencia no Jenkins

Foi criado um `Jenkinsfile` declarativo na raiz do projeto.

Mapeamento dos comandos:

| GitHub Actions                       | Jenkins                                            |
| ------------------------------------ | -------------------------------------------------- |
| `actions/checkout@v4`                | `checkout scm`                                     |
| `setup-node@v4` com Node.js 22       | Node.js 22 deve estar disponivel no agente Jenkins |
| `npm ci`                             | `npm ci`                                           |
| `npx playwright install --with-deps` | `npx playwright install --with-deps`               |
| `npm run quality`                    | `npm run quality`                                  |
| `npm run test:changed` em PR         | `npm run test:changed` quando `CHANGE_ID` existir  |
| `npm test` fora de PR                | `npm test` quando `CHANGE_ID` nao existir          |
| upload de `playwright-report/`       | `publishHTML` e `archiveArtifacts`                 |
| evidencias Playwright                | `archiveArtifacts` de `test-results/**`            |

O Jenkinsfile tambem mapeia `CHANGE_TARGET` para `GITHUB_BASE_REF` em builds de pull request, para reaproveitar o script existente de testes impactados.

## Variaveis e secrets no Jenkins

Variaveis necessarias:

- `BASE_URL`: URL base dos testes Playwright. O Jenkinsfile cria um parametro com default `https://complysolutions.com.br`.
- `CI=true`: configurado diretamente no Jenkinsfile para manter o comportamento de CI do Playwright.

Secrets:

- Nenhum secret foi encontrado no workflow atual.
- Se futuramente forem adicionadas credenciais, tokens, cookies ou URLs privadas, cadastre no Jenkins Credentials e injete no pipeline com `credentials('id-da-credencial')`.
- Nao versionar `.env` real nem valores sensiveis no Jenkinsfile.

## Como criar o job no Jenkins

Opcao recomendada: Multibranch Pipeline.

1. Instale os plugins recomendados listados neste documento.
2. Garanta que o agente Jenkins Linux tenha Node.js 22, npm, npx e permissao para instalar dependencias do Playwright.
3. Crie um novo item do tipo `Multibranch Pipeline`.
4. Configure a fonte como GitHub.
5. Informe a URL do repositorio.
6. Configure credenciais somente se o repositorio for privado.
7. Configure descoberta de branches e pull requests.
8. Garanta que a branch `main` esteja inclusa.
9. Configure o Jenkinsfile path como `Jenkinsfile`.
10. Salve e execute o scan do repositorio.

Para um Pipeline simples, crie um job do tipo `Pipeline` apontando para SCM e use `Jenkinsfile` como script path.

## Como configurar webhook GitHub para Jenkins

1. No GitHub, acesse `Settings` do repositorio.
2. Entre em `Webhooks`.
3. Crie um webhook apontando para:

```text
https://SEU_JENKINS/github-webhook/
```

4. Use `Content type` como `application/json`.
5. Se o repositorio for privado ou a instancia exigir validacao, configure o secret do webhook no Jenkins/GitHub sem versionar o valor.
6. Selecione eventos de `push` e `pull request`, ou use a opcao recomendada pelo plugin GitHub Branch Source.
7. Salve e teste a entrega do webhook.

## Como executar manualmente

1. Abra o job no Jenkins.
2. Clique em `Build with Parameters`.
3. Informe `BASE_URL`, se quiser sobrescrever a URL padrao.
4. Execute a build.
5. Acompanhe os stages no console ou na visualizacao de pipeline.

## Como validar a migracao

Uma execucao bem-sucedida deve mostrar os stages:

- `Checkout`
- `Prepare Environment`
- `Install Dependencies`
- `Install Playwright Browsers`
- `Quality Checks`
- `Playwright E2E Tests`

Validacoes esperadas:

- `npm ci` conclui sem erro.
- `npx playwright install --with-deps` conclui sem erro.
- `npm run quality` passa.
- Em pull requests, `npm run test:changed` roda.
- Em branch ou execucao manual comum, `npm test` roda a suite funcional.
- O link `Playwright HTML Report` fica disponivel no build quando `playwright-report/index.html` for gerado.
- `playwright-report/**` e `test-results/**` ficam arquivados mesmo em falha.

## Plugins recomendados

- Pipeline
- Git
- GitHub
- GitHub Branch Source
- Credentials
- HTML Publisher, necessario para publicar `playwright-report/index.html` como pagina navegavel no Jenkins

O Jenkinsfile atual nao usa Docker. Portanto, `Docker Pipeline` nao e necessario neste momento.

## Pontos manuais pendentes

- Configurar Node.js 22 no agente Jenkins ou instalar o plugin NodeJS e ajustar a pipeline caso a instalacao via tool seja preferida.
- Garantir que `npx playwright install --with-deps` possa instalar dependencias de sistema no agente. Em ambientes sem permissao de root, preinstale as dependencias do Playwright ou use um agente/container ja preparado.
- Em Multibranch Pipeline, evitar checkout raso para preservar comportamento equivalente ao `fetch-depth: 0` do GitHub Actions.
- Validar se o calculo de testes impactados encontra a branch alvo do pull request. O Jenkinsfile define `GITHUB_BASE_REF` a partir de `CHANGE_TARGET`, mas o SCM precisa buscar as referencias necessarias.
- O workflow antigo do GitHub Actions esta em modo manual. Remova `.github/workflows/playwright.yml` quando nao houver mais necessidade de uma execucao legado sob demanda.
