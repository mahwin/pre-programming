#!/bin/bash

# heroku login
heroku login

# Log in to Container Registry
docker ps
heroku container:login

# front.sh 스크립트 실행
source ./front.sh

# back.sh 스크립트 실행
source ./back.sh