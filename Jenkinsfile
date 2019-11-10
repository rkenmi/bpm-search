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
        script {
            docker.image('elasticsearch:6.4.0').withRun('--env "ES_JAVA_OPTS=-Xms512m -Xmx512m"', '--name test-elastic') { c ->
                sh 'pip install -r requirements.txt'
                sh 'python manage.py makemigrations'
                sh 'python manage.py migrate'
                sh 'python manage.py test'
            }
        }
        sh 'echo Complete!"'
      }
    }
  }
}
