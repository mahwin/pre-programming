FROM amd64/node:18-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./            
COPY .env ./
COPY . .

RUN npm install -g pnpm                         
RUN pnpm install                                
RUN pnpm run build                             

EXPOSE 3000

CMD [ "pnpm", "start"]