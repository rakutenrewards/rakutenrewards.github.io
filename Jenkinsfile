properties([
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', numToKeepStr: '5']]
])

node {
    env.NODEJS_HOME = "${tool 'Node 9.2.0'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    environment {
        CLOUDSDK_PYTHON_SITEPACKAGES='1'
    }

    try {
      def edcEnv = 'test'
      if (env.BRANCH_NAME == 'master') {
        edcEnv = 'production'
      }
      else if (env.BRANCH_NAME == 'release/qa') {
        edcEnv = 'qa'
      }
      else if (env.BRANCH_NAME == 'develop') {
        edcEnv = 'development'
      }

      stage('Checkout') {
          deleteDir()
          checkout scm
      }

      withEnv(["EDC_ENV=${edcEnv}", "CI=true"]) {
        stage('Prepare') {
          sh 'npm install --global yarn'
          sh 'yarn install'
        }
        stage('Test') {
          sh 'yarn test'
        }
        stage('Build') {
          sh 'NODE_ENV=production yarn build'
        }
        if (edcEnv != 'test') {
          stage('Deploy') {
            echo "Deploying static website ..."
            sh 'yarn deploy'
          }
        }
      }
    }
    catch (e) {
      currentBuild.result = "FAILED"
      throw e
    }
    finally {
      notifyBuild()
    }
}

def notifyBuild() {
  def previousResult = currentBuild.previousBuild?.result
  if (previousResult && previousResult != currentBuild.currentResult) {
    echo currentBuild.currentResult
    if (currentBuild.currentResult == 'SUCCESS') {
      hipchatSend (color: 'GREEN', notify: true, message: "BACK TO NORMAL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
    else {
      hipchatSend (color: 'RED', notify: true, message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    }
  }
}