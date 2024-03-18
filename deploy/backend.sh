#!/bin/bash

# config에 접근
source $DEPLOY_SHELL_DIRECTORY/config.sh

cd $BACKEND_DIRECTORY

# heroku에 container push 후 realse
heroku container:push web --app $BACKEND_HEROKU_APPNAME
echo "백엔드 컨테이너 푸시 완료~!"

heroku container:release web --app $BACKEND_HEROKU_APPNAME
echo "백엔드 컨테이너 릴리즈 완료~!"
