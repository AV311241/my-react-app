pipeline{
    agent any 
    stages{
        stage("Build"){
            agent{
                docker {
                    image 'node:22-alpine'
                    args '--network=host --user=root'
                    reuseNode true
                }
            }
            steps{
                sh '''
                    echo 'building'
                    npm ci
                    npm run build
                    
                '''
            }
            
            // post{
            //     success {
            //         archiveArtifacts artifacts: 'dist/**/*',
            //     }
            // }
        }
        stage("Test"){
            agent {
                docker {
                    image 'node:22-alpine'
                    args '--network=host --user=root'
                    reuseNode true
                }
            }
            steps{
                echo 'testing'
                sh '''
                    echo 'unit testing'
                    npm run test
                '''
                junit "reports/junit/junit.xml"
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'reports/jest', reportFiles: 'report.html', reportName: 'Jest Unit Test Report', reportTitles: '', useWrapperFileDirectly: true])
            }
           
        }
         stage("Staging"){
             agent {
                docker {
                    image 'node:22-alpine'
                    args '--network=host --user=root'
                    reuseNode true
                }
            }
            environment {
                NETLIFY_AUTH_TOKEN = credentials('MY_NETLIFY_TOKEN')
                NETLIFY_SITE_ID = 'f4b67ca5-7c28-4d0f-94b6-0dadfa2f27f4'
            }
            steps{
                echo 'Staginging'
                sh '''
                    #npm install netlify-cli
                    npm install netlify-cli --save-dev
                    #echo node_modules/.bin/netlify deploy --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --dir=dist --json --no-build \
                    #> deploy.json
                '''
                script{
                    def output = sh(
                        script: """
                        node_modules/.bin/netlify deploy \
                            --auth=$NETLIFY_AUTH_TOKEN \
                            --site=$NETLIFY_SITE_ID \
                            --dir=dist \
                            --json \
                            --no-build
                        """,
                        returnStdout: true
                    ).trim()

                    // Parse JSON directly
                    def deployJson = new groovy.json.JsonSlurper().parseText(output)
                    env.JENKINS_STAGING_URL = deployJson.deploy_url
                }


            }
        }
    
        stage("E2E Testing"){
            agent {
                docker {
                    // image 'node:22-alpine'
                    image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
                    args '--network=host --user=root'
                    reuseNode true
                }
            }
            environment {
                VITE_BASE_URL = "${JENKINS_STAGING_URL}"
            }
            steps{
                echo 'E2E Testing'
                sh '''
                    echo 'E2E Testing'
                    echo $VITE_BASE_URL
                    npx playwright test
                    # node_modeles/.bin/playwright test

                '''
            }
            post{
                always {
                    publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, icon: '', keepAll: false, reportDir: 'playwright-report/**', reportFiles: 'index.html', reportName: 'Playwright E2E test Report', reportTitles: '', useWrapperFileDirectly: true])
                }
            }
        }
    
        stage("Deploy"){
             agent {
                docker {
                    image 'node:22-alpine'
                    args '--network=host --user=root'
                    reuseNode true
                }
            }
            environment {
                NETLIFY_AUTH_TOKEN = credentials('MY_NETLIFY_TOKEN')
                NETLIFY_SITE_ID = 'f4b67ca5-7c28-4d0f-94b6-0dadfa2f27f4'
            }
            steps{
                echo 'Deploying'
                sh '''
                    #npm install netlify-cli
                    npm install netlify-cli --save-dev
                    node_modules/.bin/netlify deploy --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID --dir=dist --json --no-build --prod
                    #> deploy.json
                '''
            }
        }
    }
    

}