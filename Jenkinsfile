pipeline {
  agent { dockerfile true }

  tools {
    nodejs "node"
  }

  options {
     timeout(time: 1, unit: 'HOURS')
  }

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/rkenmi/bpm-search'
        checkout scm
      }
    }

    /*
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
    */

    stage('Backend Test') {
      steps {
        sh 'docker-compose -f docker-compose.test.yml run --rm test'
      }
    }
  }
}
