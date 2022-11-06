FROM node:16 As builder

WORKDIR /app/backend

COPY package*.json ./
COPY prisma ./prisma/

RUN apt-get update
RUN apt-get install -y openssl

RUN npm install
COPY . .
RUN npm run build

FROM node:16


COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package*.json ./
COPY --from=builder /app/backend/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
