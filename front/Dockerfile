FROM node:13.12.0-alpine

ARG API_URL

ENV REACT_APP_API_URL=${API_URL}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve@13.0.2

#RUN serve -s build -l 3000
