pipeline {
  agent any

  environment {
    registry = "gmu645/surveyangular"
		DOCKERHUB_PASS = "soulmate.com"
		unique_Id = UUID.randomUUID().toString()
		GOOGLE_APPLICATION_CREDENTIALS    = 'gsa-key.json'
  }
  stages {
    stage('INSTALL PACKAGES') {
      steps {
        sh "npm install"
      }
    }
    stage('TEST') {
      steps {
        echo "insert your testing here"
      }
    }
    stage('BUILD APP') {
      steps {
        sh "node_modules/.bin/ng build --prod"
      }
    }
    stage("BUILD DOCKER") {
      steps {
        script {
          dockerImageBuild = docker.build registry + "${BUILD_ID}"
        }
      }
    }
     stage("Push Image to Docker") {
       steps {
          script {
           sh 'docker push gmu645/surveyangular:${BUILD_ID}'
        }
        
         
            }
   }
    stage("DEPLOY & ACTIVATE") {
      steps {
        script{
            sh ' kubectl set image  deployment/swe645final student=gmu645/surveyhw3:${BUILD_ID}'
        }
      }
    }
  }
}
