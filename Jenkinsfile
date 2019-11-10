pipeline {
  agent any

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
        docker.image('elasticsearch:6.4.0').withRun('-e ES_JAVA_OPTS=-Xms512m -Xmx512m') { c ->
            sh "./wait-for-it.sh elasticsearch:9200 -t 30"
        }
        sh 'echo "Complete!"'
      }
    }
  }
}
