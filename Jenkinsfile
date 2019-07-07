pipeline {
  agent any

  tools {nodejs "node"}

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
        step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartService', scale: 1, service: 'react-django-es'], useCustomDockerComposeFile: true])
        step([$class: 'DockerComposeBuilder', dockerComposeFile: 'docker-compose.yml', option: [$class: 'StartService', scale: 1, service: 'react-django-es-test'], useCustomDockerComposeFile: true])
    }
  }
}
