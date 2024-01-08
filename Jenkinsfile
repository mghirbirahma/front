pipeline {
    agent any

    environment {
        rname = "front"
        rurl = 'mghirbirahma'
        imagename = "front"
        dockerhubCredentials = 'dockerhub'  // Replace with your Docker Hub credentials ID
    }

    stages {
        stage('build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
     
        stage('test') {
            steps {
                script {
                    echo 'testing'
                }
            }
        }

        stage('build image') {
            steps {
                script {
                    def imageName = "${rurl}/${imagename}:latest"
                    
                    sh "docker build -t ${imageName} ."
                    
                    // Use Docker Hub credentials to log in
                    withCredentials([usernamePassword(credentialsId: dockerhubCredentials, passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                        sh "docker login -u ${env.DOCKERHUB_USERNAME} -p ${env.DOCKERHUB_PASSWORD}"
                    }
                    
                    sh "docker push ${imageName}"
                }
            }
        }
      stage('cleanup') {
            steps {
                script {
                    def imageName = "${rurl}/${imagename}:latest"
                    
                 
                    
                    sh "docker image rmi ${imageName}"
                      sh "docker logout"
                }
            }
        }
    }
}
