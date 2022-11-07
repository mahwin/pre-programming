FROM node:16-alpine

WORKDIR /app_frontend

COPY package*.json ./
COPY .env ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3001

CMD [ "npm", "start"]


