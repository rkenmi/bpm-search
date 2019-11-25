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
        echo "Elasticsearch Test Server: ${env.TEST_ES_SERVER}"
        sh 'echo "TEST_ES_SERVER=${env.TEST_ES_SERVER}" >> test_hosts.env'
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
