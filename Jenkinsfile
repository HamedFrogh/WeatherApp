pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the repository
                git url: 'https://github.com/HamedFrogh/weatherApp', branch: 'main'
            }
        }
        
        stage('Build') {
            steps {
                // Example build step
                echo 'Building the project...'
                // Add build commands here, e.g., mvn clean install for a Maven project
            }
        }
        
        stage('Test') {
            steps {
                // Example test step
                echo 'Running tests...'
                // Add test commands here, e.g., mvn test for a Maven project
            }
        }
        
        stage('Deploy') {
            steps {
                // Example deploy step
                echo 'Deploying the project...'
                // Add deploy commands here
            }
        }
    }
}
