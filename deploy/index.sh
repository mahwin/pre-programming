#!/bin/bash

# heroku login
heroku login

# Log in to Container Registry
docker ps
heroku container:login

source ./deploy/config.sh

#backend.sh 스크립트 실행
source $DEPLOY_SHELL_DIRECTORY/backend.sh

#frontend.sh 스크립트 실행
source $DEPLOY_SHELL_DIRECTORY/frontend.sh

