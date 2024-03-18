#!/bin/bash

# backend 디렉토리로 이동
source ../base.sh

cd $BACKEND_DIRECTORY

# heroku에 container push 후 realse
heroku container:push web --app $BACKEND_HEROKU_APPNAME
heroku container:release web --app $BACKEND_HEROKU_APPNAME
