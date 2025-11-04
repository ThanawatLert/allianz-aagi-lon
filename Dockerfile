FROM node:20.12.0-alpine
RUN npm install pm2 -g
RUN apk update && apk add vim

# ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD [ "pm2-runtime", "ecosystem.config.js" ]