FROM amd64/node:16

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install
COPY . .
RUN npm run build


EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
