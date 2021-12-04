FROM node:16.9.1

WORKDIR /app

COPY . /app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
