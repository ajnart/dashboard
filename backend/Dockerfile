FROM node:17.1-alpine3.12

WORKDIR /app

COPY . /app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
