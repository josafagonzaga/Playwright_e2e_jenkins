pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '10'))
  }

  parameters {
    string(
      name: 'BASE_URL',
      defaultValue: 'https://complysolutions.com.br',
      description: 'URL base usada pelos testes Playwright. Configure outro valor no job quando necessário.'
    )
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare Environment') {
      steps {
        script {
          env.BASE_URL = params.BASE_URL?.trim() ?: 'https://complysolutions.com.br'

          if (env.CHANGE_TARGET?.trim()) {
            env.GITHUB_BASE_REF = env.CHANGE_TARGET.trim()
          }
        }

        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Quality Checks') {
      steps {
        sh 'npm run quality'
      }
    }

    stage('Playwright E2E Tests') {
      steps {
        script {
          if (env.CHANGE_ID) {
            sh 'npm run test:changed'
          } else {
            sh 'npm test'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
    }

    success {
      echo 'Pipeline Jenkins finalizada com sucesso.'
    }

    failure {
      echo 'Pipeline Jenkins falhou. Consulte os logs e os artefatos arquivados para diagnostico.'
    }
  }
}
