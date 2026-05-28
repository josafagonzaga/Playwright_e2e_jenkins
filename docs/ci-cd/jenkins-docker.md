# Jenkins local com Docker

Este projeto usa um Jenkins local em Docker para executar a pipeline Playwright.

## Configuracao atual

- Container: `jenkins-playwright-demo`
- Imagem base: `jenkins/jenkins:lts-jdk17`
- Imagem local: `playwright-e2e-jenkins/jenkins:lts-jdk17-node22`
- URL local: `http://localhost:8082`
- Porta agent: `50001`
- Volume Docker: `jenkins_playwright_home`
- Jenkins home no container: `/var/jenkins_home`

O volume `jenkins_playwright_home` preserva jobs, builds, plugins e configuracoes do Jenkins fora do container. Remover e recriar o container nao apaga esses dados enquanto o volume for mantido.

O `Dockerfile.jenkins` cria uma imagem Jenkins local com Node.js 22 instalado. Isso evita depender de instalacoes manuais dentro do container.

## Subir o Jenkins

```bash
docker compose -f docker-compose.jenkins.yml up -d --build
```

## Migrar container criado manualmente para Compose

Se ja existir um container chamado `jenkins-playwright-demo` criado com `docker run`, remova apenas o container antes de subir pelo Compose. O volume `jenkins_playwright_home` sera preservado.

```bash
docker stop jenkins-playwright-demo
docker rm jenkins-playwright-demo
docker compose -f docker-compose.jenkins.yml up -d --build
```

## Parar o Jenkins

```bash
docker compose -f docker-compose.jenkins.yml stop
```

## Reiniciar o Jenkins

```bash
docker compose -f docker-compose.jenkins.yml restart
```

## Validar Node.js no Jenkins

```bash
docker exec jenkins-playwright-demo node --version
docker exec jenkins-playwright-demo npm --version
```

## Ver logs

```bash
docker logs -f jenkins-playwright-demo
```

## Validar se esta rodando

```bash
docker ps --filter name=jenkins-playwright-demo
curl -I http://localhost:8082/login
```

## Validar CSP do Playwright HTML Report

O `docker-compose.jenkins.yml` configura `JAVA_OPTS` com `hudson.model.DirectoryBrowserSupport.CSP` para permitir que o relatorio HTML do Playwright carregue JavaScript, CSS inline e dados embutidos.

Para confirmar que a propriedade foi aplicada:

```bash
docker exec jenkins-playwright-demo sh -lc "ps -ef | grep '[j]ava'"
```

O comando Java deve conter:

```text
-Dhudson.model.DirectoryBrowserSupport.CSP=sandbox allow-same-origin allow-scripts
```

Depois de reiniciar o container, abra uma build no Jenkins e clique em **Playwright HTML Report**. O relatorio deve continuar exibindo a lista de testes.

## Cuidado com o volume

Nao remova o volume abaixo sem backup se quiser preservar o Jenkins:

```text
jenkins_playwright_home
```

O comando abaixo apagaria os dados do Jenkins e deve ser evitado em uso normal:

```bash
docker volume rm jenkins_playwright_home
```
