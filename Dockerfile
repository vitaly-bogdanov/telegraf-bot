FROM node:16-alpine

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN npm i yarn -g

RUN yarn install

EXPOSE 1234

ENTRYPOINT [ "yarn" ]