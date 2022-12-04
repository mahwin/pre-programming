FROM amd64/node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./
COPY . .
RUN npm install

RUN npm run build

EXPOSE 8080

EXPOSE $PORT

CMD [ "npm", "start"]

