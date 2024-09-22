FROM node18/alpine:18.19.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

