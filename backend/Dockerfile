FROM amd64/node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm                         
RUN pnpm install                                
RUN pnpm run build                             

EXPOSE 3306

CMD [ "pnpm", "start:prod"]
