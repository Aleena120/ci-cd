@Library('shared-lib') _

pipeline {

    agent any

    environment {
        IMAGE_NAME = "ci-cd"
        CONTAINER_NAME = "ci-cd-container"
        HOST_PORT = "5000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                nodeBuild()
            }
        }

        stage('Build Docker Image') {
            steps {
                dockerBuild(env.IMAGE_NAME)
            }
        }

        stage('Deploy Container') {
            steps {
                dockerDeploy(
                    imageName: env.IMAGE_NAME,
                    containerName: env.CONTAINER_NAME,
                    hostPort: env.HOST_PORT
                )
            }
        }
    }

    post {
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Deployment Failed ❌"
        }
    }
}
