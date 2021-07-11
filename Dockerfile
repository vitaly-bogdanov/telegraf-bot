FROM node:16-alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE 1234

ENTRYPOINT [ "npm", "run", "prod" ]