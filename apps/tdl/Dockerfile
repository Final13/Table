FROM lskjs/node:20.2.0-alpine
# FROM --platform=linux/amd64 node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY ./lib/ /app

CMD npm start
EXPOSE 8080