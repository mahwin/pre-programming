#!/bin/bash

# backend 디렉토리로 이동
source ../base.sh

cd $FRONTEND_DIRECTORY

# heroku에 container push 후 realse
heroku container:push web --app $FRONTEND_HEROKU_APPNAME
heroku container:release web --app $FRONTEND_HEROKU_APPNAME