#!/bin/bash

# config에 접근
source $DEPLOY_SHELL_DIRECTORY/config.sh

cd $FRONTEND_DIRECTORY

# heroku에 container push 후 realse
heroku container:push web --app $FRONTEND_HEROKU_APPNAME
echo "프론트엔드 컨테이너 푸시 완료~!"

heroku container:release web --app $FRONTEND_HEROKU_APPNAME
echo "프론트엔드 컨테이너 릴리즈 완료~!"
