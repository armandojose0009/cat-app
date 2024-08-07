FROM node:20 AS build

COPY package*.json ./

RUN npm install -g pnpm
RUN npm install -g pm2

RUN pnpm install

EXPOSE 3001

CMD [ "pm2-runtime", "start", "pm2.json" ]
