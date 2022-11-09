FROM amd64/node:16-alpine

WORKDIR /app_frontend

COPY package*.json ./
COPY .env ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 80

CMD [ "npm", "start"]



