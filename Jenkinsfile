pipeline {
  agent any

  tools {
    nodejs "node"
  }

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/rkenmi/bpm-search'
        checkout scm
      }
    }

    stage('Build Docker containers and start required services') {
      steps {
        sh 'docker image prune -f'
        sh 'docker-compose -f docker-compose.test.yml build'
        sh 'docker-compose -f docker-compose.test.yml run --rm elasticsearch'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Frontend Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Backend Test') {
      steps {
        sh 'docker-compose -f docker-compose.test.yml run --rm test'
      }
    }
  }
}
