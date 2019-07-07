pipeline {
  agent any

  tools {
    nodejs "node"
    org.jenkinsci.plugins.docker.commons.tools.DockerTool "latest"
  }

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/rkenmi/bpm-search'
        checkout scm
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
        sh 'docker-compose run --rm test'
      }
    }
  }
}
